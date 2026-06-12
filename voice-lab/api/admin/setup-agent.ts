import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from '../_lib/load-env'
import { buildSystemPrompt } from '../_lib/prompts'

loadLocalEnv()

const AGENT_NAME = 'JM Voice Lab B2C v1'

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

function buildAgentBody(systemPrompt: string, voiceId?: string) {
  const patch: Record<string, unknown> = {
    name: AGENT_NAME,
    conversation_config: {
      conversation: { max_duration_seconds: 600 },
      turn: {
        turn_timeout: 8,
        silence_end_call_timeout: 18,
        turn_eagerness: 'normal',
        soft_timeout_config: {
          timeout_seconds: 8,
          message: 'Ek second, main check karti hoon.',
          use_llm_generated_message: true,
        },
      },
      agent: {
        first_message:
          'Namaste! Janata Masala se bol rahi hoon. Aaj kya chahiye aapko? List bata dijiye.',
        language: 'hi',
        hinglish_mode: true,
        prompt: {
          prompt: systemPrompt,
          llm: 'claude-sonnet-4',
          built_in_tools: {
            language_detection: {
              name: 'language_detection',
              params: { system_tool_type: 'language_detection' },
            },
            end_call: {
              name: 'end_call',
              params: { system_tool_type: 'end_call' },
            },
          },
        },
      },
      language_presets: {
        hi: {
          overrides: {
            agent: {
              first_message: 'Namaste! Janata Masala se. Aaj kya chahiye? List bata dijiye.',
            },
          },
        },
        en: {
          overrides: {
            agent: {
              first_message: 'Hello from Janata Masala! What would you like to order today?',
            },
          },
        },
      },
      tts: {
        model_id: 'eleven_flash_v2_5',
        ...(voiceId ? { voice_id: voiceId } : {}),
      },
    },
  }
  return patch
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
  const voiceId = process.env.ELEVENLABS_VOICE_ID
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
      buildAgentBody(systemPrompt, voiceId),
    )

    return res.status(200).json({
      ok: true,
      agent_id: agentId,
      agent_name: AGENT_NAME,
      prompt_version: process.env.JM_PROMPT_VERSION || 'v1.0.0',
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
