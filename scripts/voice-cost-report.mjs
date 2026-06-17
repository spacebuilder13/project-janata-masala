#!/usr/bin/env node
/**
 * Voice Costing Report v1 — fetch live voice-runs + EL balance, write INR report.
 * See docs/VOICE_COSTING_V1.md
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'outputs', 'voice-costing')

// --- env loading (mirrors api/_lib/load-env.ts) ---
function loadLocalEnv() {
  for (const name of ['.env.local', '.env']) {
    let dir = ROOT
    for (let i = 0; i < 6; i++) {
      const filePath = path.join(dir, name)
      if (fs.existsSync(filePath)) {
        for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) continue
          const eq = trimmed.indexOf('=')
          if (eq === -1) continue
          const key = trimmed.slice(0, eq).trim()
          let val = trimmed.slice(eq + 1).trim()
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1)
          }
          if (!process.env[key]) process.env[key] = val
        }
      }
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  }
}

loadLocalEnv()

const BASE_URL = (process.env.VOICE_COST_BASE_URL || 'https://project-janata-masala.vercel.app').replace(/\/$/, '')
const DEMO_PASSWORD = process.env.DEMO_PASSWORD
const EL_PLAN_USD = Number(process.env.EL_PLAN_USD || '22')
const EL_PLAN_CREDITS = Number(process.env.EL_PLAN_CREDITS || '248000')
const USD_INR_FX = Number(process.env.USD_INR_FX || '83')

if (!DEMO_PASSWORD) {
  console.error('Error: DEMO_PASSWORD is required (set in env or .env.local)')
  process.exit(1)
}

const PLAN_INR = EL_PLAN_USD * USD_INR_FX
const INR_PER_CREDIT = PLAN_INR / EL_PLAN_CREDITS

function inr(credits) {
  return credits * INR_PER_CREDIT
}

function fmt(n, digits = 2) {
  return n.toFixed(digits)
}

function fmtInr(n, digits = 2) {
  return `₹${fmt(n, digits)}`
}

function isSystemRun(r) {
  return r.session_id.startsWith('test-') || r.meta?.source === 'smoke-test'
}

function elCredits(r) {
  return r.usage?.elevenlabs?.credits_used || 0
}

function charging(r) {
  return r.usage?.elevenlabs?.charging || {}
}

function postClaudeInr(r) {
  return r.usage?.estimated_cost_inr || 0
}

function toIst(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

async function fetchJson(url) {
  const res = await fetch(url)
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(`${url} → non-JSON (${res.status}): ${text.slice(0, 200)}`)
  }
  if (!res.ok) {
    throw new Error(`${url} → ${res.status}: ${data.error || text.slice(0, 200)}`)
  }
  return data
}

function buildReport(runs, balance, generatedAt) {
  runs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

  const systemRuns = runs.filter(isSystemRun)
  const liveRuns = runs.filter((r) => !isSystemRun(r))

  const allLoggedCredits = runs.reduce((s, r) => s + elCredits(r), 0)
  const liveCredits = liveRuns.reduce((s, r) => s + elCredits(r), 0)
  const livePostClaude = liveRuns.reduce((s, r) => s + postClaudeInr(r), 0)
  const liveDuration = liveRuns.reduce((s, r) => s + (r.duration_secs || 0), 0)

  let callCr = 0
  let llmCr = 0
  for (const r of liveRuns) {
    const ch = charging(r)
    callCr += ch.call_charge || 0
    llmCr += ch.llm_charge || 0
  }

  const dashUsed = balance.character_count_used ?? 0
  const dashLimit = balance.character_limit ?? EL_PLAN_CREDITS
  const dashRemaining = balance.character_remaining ?? Math.max(0, dashLimit - dashUsed)
  const gapCredits = dashUsed - allLoggedCredits

  const liveMins = liveDuration / 60
  const allInPerMin = liveMins > 0 ? (inr(liveCredits) + livePostClaude) / liveMins : 0
  const elPerMin = liveMins > 0 ? inr(liveCredits) / liveMins : 0
  const creditsPerMin = liveMins > 0 ? liveCredits / liveMins : 0

  const successRuns = liveRuns.filter((r) => r.status === 'done')
  const failRuns = liveRuns.filter((r) => r.status !== 'done')

  function subsetStats(subset) {
    const cr = subset.reduce((s, r) => s + elCredits(r), 0)
    const dur = subset.reduce((s, r) => s + (r.duration_secs || 0), 0)
    const pc = subset.reduce((s, r) => s + postClaudeInr(r), 0)
    const total = inr(cr) + pc
    return { count: subset.length, cr, dur, pc, total }
  }

  const succ = subsetStats(successRuns)
  const fail = subsetStats(failRuns)

  const byAgent = {}
  for (const r of liveRuns) {
    const k = r.agent_key || 'unknown'
    if (!byAgent[k]) byAgent[k] = { count: 0, cr: 0, dur: 0 }
    byAgent[k].count++
    byAgent[k].cr += elCredits(r)
    byAgent[k].dur += r.duration_secs || 0
  }

  const lines = []
  lines.push('# Voice Costing Report (v1)')
  lines.push('')
  lines.push(`**Generated:** ${toIst(generatedAt)} IST`)
  lines.push(`**Base URL:** ${BASE_URL}`)
  lines.push(`**EL tier:** ${balance.tier ?? '—'}`)
  lines.push(`**Plan:** $${EL_PLAN_USD}/mo → ${EL_PLAN_CREDITS.toLocaleString('en-IN')} credits (${fmtInr(PLAN_INR)}/mo)`)
  lines.push('')

  lines.push('## Plan economics')
  lines.push('')
  lines.push(`| Metric | Value |`)
  lines.push(`|--------|-------|`)
  lines.push(`| ₹ per credit | ${fmtInr(INR_PER_CREDIT, 4)} |`)
  lines.push(`| Monthly pool | ${EL_PLAN_CREDITS.toLocaleString('en-IN')} credits |`)
  lines.push(`| Subscription | ${fmtInr(PLAN_INR)}/mo |`)
  lines.push('')

  lines.push('## Dashboard snapshot (ElevenLabs)')
  lines.push('')
  lines.push(`| Metric | Credits | ₹ equivalent |`)
  lines.push(`|--------|---------|--------------|`)
  lines.push(`| Used | ${dashUsed.toLocaleString('en-IN')} | ${fmtInr(inr(dashUsed))} |`)
  lines.push(`| Remaining | ${dashRemaining.toLocaleString('en-IN')} | ${fmtInr(inr(dashRemaining))} |`)
  lines.push(`| Pool | ${dashLimit.toLocaleString('en-IN')} | ${fmtInr(PLAN_INR)} |`)
  lines.push(`| % remaining | ${balance.pct_remaining ?? fmt((dashRemaining / dashLimit) * 100, 1)}% | |`)
  lines.push('')

  lines.push('## Gap analysis')
  lines.push('')
  lines.push(`Logged voice-run credits (all runs): **${allLoggedCredits.toLocaleString('en-IN')}** (${fmtInr(inr(allLoggedCredits))})`)
  lines.push(`Dashboard used − logged: **${gapCredits.toLocaleString('en-IN')}** credits (${fmtInr(inr(gapCredits))}) — agent sync, voice-lab, or other EL API usage outside voice-runs log`)
  lines.push('')

  lines.push('## Live sessions summary')
  lines.push('')
  lines.push(`| Metric | Value |`)
  lines.push(`|--------|-------|`)
  lines.push(`| Live sessions | ${liveRuns.length} (${systemRuns.length} system/smoke excluded) |`)
  lines.push(`| EL credits | ${liveCredits.toLocaleString('en-IN')} → ${fmtInr(inr(liveCredits))} |`)
  lines.push(`| Post-call Claude | ${fmtInr(livePostClaude)} |`)
  lines.push(`| **Full stack** | **${fmtInr(inr(liveCredits) + livePostClaude)}** |`)
  lines.push(`| Talk time | ${fmt(liveMins, 1)} min |`)
  lines.push(`| All-in ₹/min | ${fmtInr(allInPerMin)}/min |`)
  lines.push(`| EL-only ₹/min | ${fmtInr(elPerMin)}/min |`)
  lines.push(`| Credits/min | ${fmt(creditsPerMin, 0)} |`)
  lines.push('')

  lines.push('## Where money went (live sessions)')
  lines.push('')
  const fullStack = inr(liveCredits) + livePostClaude
  const pct = (n) => (fullStack > 0 ? fmt((n / fullStack) * 100, 0) : '0')
  lines.push(`| Component | Credits | ₹ | % of full stack |`)
  lines.push(`|-----------|---------|---|-----------------|`)
  lines.push(`| Voice platform (call_charge) | ${callCr.toLocaleString('en-IN')} | ${fmtInr(inr(callCr))} | ${pct(inr(callCr))}% |`)
  lines.push(`| In-call Claude (llm_charge) | ${llmCr.toLocaleString('en-IN')} | ${fmtInr(inr(llmCr))} | ${pct(inr(llmCr))}% |`)
  lines.push(`| Post-call Claude (Anthropic) | — | ${fmtInr(livePostClaude)} | ${pct(livePostClaude)}% |`)
  lines.push('')

  lines.push('## By outcome')
  lines.push('')
  lines.push(`| Outcome | Sessions | EL credits | Post-call ₹ | Total ₹ | Talk time | ₹/min |`)
  lines.push(`|---------|----------|------------|-------------|---------|-----------|-------|`)
  for (const [label, s] of [
    ['Successful (done)', succ],
    ['Failed / aborted', fail],
  ]) {
    const mins = s.dur / 60
    lines.push(
      `| ${label} | ${s.count} | ${s.cr.toLocaleString('en-IN')} | ${fmtInr(s.pc)} | ${fmtInr(s.total)} | ${fmt(mins, 1)} min | ${mins > 0 ? fmtInr(s.total / mins) : '—'} |`,
    )
  }
  lines.push('')

  lines.push('## By agent')
  lines.push('')
  lines.push(`| Agent | Sessions | Credits | ₹ | Talk time | Credits/min |`)
  lines.push(`|-------|----------|---------|---|-----------|-------------|`)
  for (const [agent, s] of Object.entries(byAgent).sort()) {
    const mins = s.dur / 60
    lines.push(
      `| ${agent} | ${s.count} | ${s.cr.toLocaleString('en-IN')} | ${fmtInr(inr(s.cr))} | ${fmt(mins, 1)} min | ${mins > 0 ? fmt(s.cr / mins, 0) : '—'} |`,
    )
  }
  lines.push('')

  lines.push('## Per-session (live, chronological)')
  lines.push('')
  lines.push(`| # | Time (IST) | Agent | Status | Dur | Credits | EL ₹ | Claude ₹ | Total ₹ |`)
  lines.push(`|---|------------|-------|--------|-----|---------|------|----------|---------|`)
  liveRuns.forEach((r, i) => {
    const cr = elCredits(r)
    const pc = postClaudeInr(r)
    const elInr = inr(cr)
    lines.push(
      `| ${i + 1} | ${toIst(r.created_at)} | ${r.agent_key} | ${r.status} | ${r.duration_secs ?? '—'}s | ${cr} | ${fmtInr(elInr)} | ${fmtInr(pc)} | ${fmtInr(elInr + pc)} |`,
    )
  })
  lines.push('')

  if (systemRuns.length) {
    lines.push('## System / smoke tests (excluded from live totals)')
    lines.push('')
    lines.push(`| Session | Agent | Status | Credits |`)
    lines.push(`|---------|-------|--------|---------|`)
    for (const r of systemRuns) {
      lines.push(`| \`${r.session_id}\` | ${r.agent_key} | ${r.status} | ${elCredits(r)} |`)
    }
    lines.push('')
  }

  lines.push('## Budget context')
  lines.push('')
  lines.push(`- Voice demos used **${fmt((liveCredits / EL_PLAN_CREDITS) * 100, 1)}%** of monthly EL pool`)
  lines.push(`- All dashboard usage: **${fmt((dashUsed / dashLimit) * 100, 1)}%** of pool (${fmtInr(inr(dashUsed))} of ${fmtInr(PLAN_INR)} plan value)`)
  if (creditsPerMin > 0) {
    const minsLeft = dashRemaining / creditsPerMin
    lines.push(`- At current rate (~${fmt(creditsPerMin, 0)} credits/min), remaining pool ≈ **${fmt(minsLeft, 0)} min** of calls`)
  }
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push(`[Voice runs HTML viewer](${BASE_URL}/api/voice-runs?view=html&key=${encodeURIComponent(DEMO_PASSWORD)}) · Methodology: \`docs/VOICE_COSTING_V1.md\``)
  lines.push('')

  return lines.join('\n')
}

async function main() {
  const generatedAt = new Date().toISOString()

  const [runsData, balanceData] = await Promise.all([
    fetchJson(`${BASE_URL}/api/voice-runs?key=${encodeURIComponent(DEMO_PASSWORD)}&limit=100`),
    fetchJson(`${BASE_URL}/api/usage-snapshot?balance=true`),
  ])

  const runs = runsData.runs || []
  const balance = balanceData.balance || {}

  const report = buildReport(runs, balance, generatedAt)

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const latestPath = path.join(OUT_DIR, 'latest.md')
  fs.writeFileSync(latestPath, report)

  const stamp = new Date()
    .toLocaleString('en-CA', { timeZone: 'Asia/Kolkata', hour12: false })
    .replace(', ', '-')
    .replace(/:/g, '')
    .slice(0, 15)
  const archivePath = path.join(OUT_DIR, `report-${stamp}.md`)
  fs.writeFileSync(archivePath, report)

  const liveRuns = runs.filter((r) => !isSystemRun(r))
  const liveCredits = liveRuns.reduce((s, r) => s + elCredits(r), 0)
  const livePostClaude = liveRuns.reduce((s, r) => s + postClaudeInr(r), 0)
  const liveDuration = liveRuns.reduce((s, r) => s + (r.duration_secs || 0), 0)
  const dashUsed = balance.character_count_used ?? 0

  const allInPerMin = liveDuration > 0 ? (inr(liveCredits) + livePostClaude) / (liveDuration / 60) : 0

  console.log('Voice Costing Report v1')
  console.log('─'.repeat(40))
  console.log(`Live sessions: ${liveRuns.length} | EL credits: ${liveCredits.toLocaleString('en-IN')} (${fmtInr(inr(liveCredits))})`)
  console.log(`Post-call Claude: ${fmtInr(livePostClaude)} | Full stack: ${fmtInr(inr(liveCredits) + livePostClaude)}`)
  console.log(`Talk time: ${fmt(liveDuration / 60, 1)} min | All-in: ${fmtInr(allInPerMin)}/min`)
  console.log(`Dashboard: ${dashUsed.toLocaleString('en-IN')} credits used (${fmtInr(inr(dashUsed))})`)
  console.log('─'.repeat(40))
  console.log(`Wrote: ${path.relative(ROOT, latestPath)}`)
  console.log(`Archive: ${path.relative(ROOT, archivePath)}`)
}

main().catch((e) => {
  console.error('voice-cost-report failed:', e.message)
  process.exit(1)
})
