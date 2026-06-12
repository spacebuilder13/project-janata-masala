import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from '../_lib/load-env'
import { buildAgentPatchBody, resolveVoiceId, AGENT_NAME } from '../_lib/agent-config'
import { buildSystemPrompt } from '../_lib/prompts'

loadLocalEnv()

async function elRequest(apiKey: string, method: string, url: string, body?: unknown) {
  const resp = await fetch(url, {
    method,
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: body == null ? undefined : JSON.stringify(body),
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`ElevenLabs ${resp.status}: ${text.slice(0, 500)}`)
  }
  const raw = await resp.text()
  return raw ? JSON.parse(raw) : null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminToken = process.env.JM_VOICE_ADMIN_TOKEN || ''
  if (adminToken) {
    const provided =
      req.headers['x-admin-token'] ||
      (typeof req.headers.authorization === 'string'
        ? req.headers.authorization.replace(/^Bearer\s+/i, '')
        : '')
    if (provided !== adminToken) {
      return res.status(403).json({ error: 'Forbidden' })
    }
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing ELEVENLABS_API_KEY' })
  }

  const agentId = process.env.ELEVENLABS_AGENT_ID
  const voiceId = resolveVoiceId(process.env.ELEVENLABS_VOICE_ID)
  const systemPrompt = buildSystemPrompt()

  try {
    if (!agentId) {
      return res.status(400).json({
        error: 'ELEVENLABS_AGENT_ID not set. Run scripts/create-or-patch-agent.js first.',
      })
    }

    await elRequest(
      apiKey,
      'PATCH',
      `https://api.elevenlabs.io/v1/convai/agents/${encodeURIComponent(agentId)}`,
      buildAgentPatchBody(systemPrompt, voiceId),
    )

    return res.status(200).json({
      ok: true,
      agent_id: agentId,
      agent_name: AGENT_NAME,
      voice_id: voiceId,
      prompt_version: process.env.JM_PROMPT_VERSION || 'v1.1.0',
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
