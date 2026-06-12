import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from './_lib/load-env'
import {
  getVoiceRun,
  isVoiceRunsStoreConfigured,
  listVoiceRuns,
  patchVoiceRunUsage,
  saveVoiceRun,
  type VoiceRunRecord,
} from './_lib/voice-runs-store'

loadLocalEnv()

function isAuthorized(req: VercelRequest): boolean {
  const expected = process.env.DEMO_PASSWORD
  if (!expected) return false
  const key =
    (typeof req.query.key === 'string' ? req.query.key : null) ||
    (typeof req.headers['x-voice-log-key'] === 'string' ? req.headers['x-voice-log-key'] : null)
  return key === expected
}

function renderHtml(runs: VoiceRunRecord[], baseUrl: string) {
  const rows = runs
    .map((r) => {
      const items = (r.structured as { order?: { items?: unknown[] } })?.order?.items?.length ?? 0
      const total = (r.structured as { order?: { total?: number } })?.order?.total
      const agent = r.agent_key || r.meta?.agent_key || '—'
      const ok = r.validation?.ok ? 'yes' : 'no'
      const when = new Date(r.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      return `<tr>
        <td>${when}</td>
        <td><strong>${agent}</strong></td>
        <td class="mono">${r.session_id}</td>
        <td>${r.status}</td>
        <td>${ok}</td>
        <td>${items}${total != null ? ` · ₹${total}` : ''}</td>
        <td><a href="${baseUrl}&session_id=${encodeURIComponent(r.session_id)}">JSON</a></td>
      </tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>JM Voice Runs</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; background: #fbfaf6; color: #1b1a17; }
    h1 { font-family: Georgia, serif; font-weight: 400; }
    .sub { color: #8a857c; font-size: 14px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e7e2d5; border-radius: 12px; overflow: hidden; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e7e2d5; font-size: 13px; }
    th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a857c; background: #f5f2ea; }
    .mono { font-family: ui-monospace, monospace; font-size: 11px; }
    a { color: #c45a1a; }
    pre { background: #f5f2ea; padding: 16px; border-radius: 12px; overflow: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>Janata Masala · Voice run log</h1>
  <p class="sub">Priya + Meera attempts stored in Vercel Blob. Latest ${runs.length} runs.</p>
  <table>
    <thead><tr><th>When (IST)</th><th>Agent</th><th>Session</th><th>Status</th><th>Valid</th><th>Order</th><th></th></tr></thead>
    <tbody>${rows || '<tr><td colspan="7">No runs logged yet.</td></tr>'}</tbody>
  </table>
</body>
</html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isVoiceRunsStoreConfigured()) {
    return res.status(503).json({
      error: 'Voice run store not configured',
      hint: 'Link a Vercel Blob store to this project (BLOB_READ_WRITE_TOKEN)',
    })
  }

  if (req.method === 'POST') {
    const body = req.body as Partial<VoiceRunRecord> & { patch_usage?: boolean }
    if (body.patch_usage && body.session_id && body.usage) {
      const ok = await patchVoiceRunUsage(body.session_id, body.usage)
      return res.status(ok ? 200 : 404).json({ ok })
    }

    if (!body.session_id || !body.created_at) {
      return res.status(400).json({ error: 'session_id and created_at required' })
    }

    const run: VoiceRunRecord = {
      session_id: body.session_id,
      created_at: body.created_at,
      agent_key: body.agent_key ?? String(body.meta?.agent_key ?? 'unknown'),
      conversation_id: body.conversation_id ?? null,
      transcript: body.transcript ?? '',
      structured: body.structured ?? null,
      validation: body.validation ?? { ok: false, errors: ['missing'] },
      usage: body.usage ?? {},
      meta: body.meta ?? {},
      duration_secs: body.duration_secs,
      status: body.status ?? 'done',
    }

    await saveVoiceRun(run)
    return res.status(200).json({ ok: true, session_id: run.session_id })
  }

  if (req.method === 'GET') {
    if (!isAuthorized(req)) {
      return res.status(401).json({
        error: 'Unauthorized',
        hint: 'Pass ?key= same as DEMO_PASSWORD, or X-Voice-Log-Key header',
      })
    }

    const sessionId = typeof req.query.session_id === 'string' ? req.query.session_id : null
    if (sessionId) {
      const run = await getVoiceRun(sessionId)
      if (!run) return res.status(404).json({ error: 'not found' })
      return res.status(200).json(run)
    }

    const limit = Math.min(Number(req.query.limit) || 50, 100)
    const runs = await listVoiceRuns(limit)

    if (req.query.view === 'html') {
      const proto = req.headers['x-forwarded-proto'] ?? 'https'
      const host = req.headers.host ?? 'project-janata-masala.vercel.app'
      const baseUrl = `${proto}://${host}/api/voice-runs?view=html&key=${encodeURIComponent(String(req.query.key))}`
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.status(200).send(renderHtml(runs, baseUrl))
    }

    return res.status(200).json({ runs, count: runs.length })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
