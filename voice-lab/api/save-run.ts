import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from './_lib/load-env'
import { appendLedger, writeRunArtifacts } from './_lib/run-writer'

loadLocalEnv()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    session_id,
    transcript,
    structured,
    validation,
    usage,
    meta,
    duration_s,
    outcome_score,
  } = req.body as {
    session_id?: string
    transcript?: string
    structured?: unknown
    validation?: { ok: boolean; errors: string[] }
    usage?: Record<string, unknown>
    meta?: Record<string, unknown>
    duration_s?: number
    outcome_score?: number | null
  }

  if (!session_id || !transcript) {
    return res.status(400).json({ error: 'session_id and transcript required' })
  }

  try {
    writeRunArtifacts({
      sessionId: session_id,
      transcript,
      structured: structured ?? null,
      validation: validation ?? { ok: false, errors: ['missing'] },
      usage: usage ?? {},
      meta: meta ?? {},
    })

    const elCredits = Number((usage as { elevenlabs?: { credits_used?: number } })?.elevenlabs?.credits_used ?? 0)
    const claudeIn = Number((usage as { claude?: { input_tokens?: number } })?.claude?.input_tokens ?? 0)
    const claudeOut = Number((usage as { claude?: { output_tokens?: number } })?.claude?.output_tokens ?? 0)
    const claudeUsd = Number((usage as { estimated_cost_usd?: number })?.estimated_cost_usd ?? 0)

    appendLedger({
      timestamp_utc: new Date().toISOString(),
      session_id,
      duration_s: duration_s ?? 0,
      el_credits: elCredits,
      claude_input_tokens: claudeIn,
      claude_output_tokens: claudeOut,
      claude_cost_usd: claudeUsd,
      schema_ok: validation?.ok ? 'yes' : 'no',
      outcome_score: outcome_score ?? '',
    })

    return res.status(200).json({ ok: true, session_id })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
