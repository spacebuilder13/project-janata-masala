#!/usr/bin/env node
/**
 * Create or patch ElevenLabs ConvAI agents for JM Voice Lab.
 * Usage:
 *   node scripts/create-or-patch-agent.js --agent priya
 *   node scripts/create-or-patch-agent.js --agent meera
 *   node scripts/create-or-patch-agent.js --agent all
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import './_load-env.js'

const JM_HINDI_VOICE_ID = 'ohvvU75FpBEB8fdaLOMh'

const AGENTS = {
  priya: {
    key: 'priya',
    name: 'JM Priya — List Dump',
    promptVersion: 'v1.2.0-priya',
    envKeys: ['ELEVENLABS_AGENT_ID_PRIYA', 'ELEVENLABS_AGENT_ID'],
    snapshotDir: 'jm-priya',
    firstMessageHi: 'Janta Masala — boliye, kya chahiye?',
    firstMessageEn: 'Janta Masala — what do you need today?',
    turnEagerness: 'eager',
    ttsSpeed: 1.08,
    speculativeTurn: true,
    softTimeoutMessage: 'Haan, sun rahi hoon.',
    turnTimeout: 5,
    silenceTimeout: 12,
    softTimeoutSecs: 4,
    promptFiles: ['jm-voice-priya-system.md', 'jm-voice-closure.md', 'jm-catalog-rules.md'],
  },
  meera: {
    key: 'meera',
    name: 'JM Meera — Counter Expert',
    promptVersion: 'v2.0.0-meera',
    envKeys: ['ELEVENLABS_AGENT_ID_MEERA'],
    snapshotDir: 'jm-meera',
    firstMessageHi:
      'Namaste! Janta Masala — Meera bol rahi hoon. Aaj kya chahiye, seedha list bhi chalegi.',
    firstMessageEn: 'Hello! Janta Masala — Meera here. What would you like today?',
    turnEagerness: 'normal',
    ttsSpeed: 0.98,
    speculativeTurn: false,
    softTimeoutMessage: 'Ji, sun rahi hoon…',
    turnTimeout: 7,
    silenceTimeout: 18,
    softTimeoutSecs: 6,
    promptFiles: [
      'jm-voice-meera-system.md',
      'jm-voice-meera-pairings.md',
      'jm-voice-meera-closure.md',
      'jm-catalog-knowledge.generated.md',
    ],
  },
}

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function parseAgentArg() {
  const idx = process.argv.indexOf('--agent')
  const val = idx >= 0 ? process.argv[idx + 1] : 'priya'
  if (val === 'all') return Object.keys(AGENTS)
  if (!AGENTS[val]) {
    console.error(`Unknown agent "${val}". Use: priya | meera | all`)
    process.exit(1)
  }
  return [val]
}

function readPrompt(name) {
  const p = path.join(root, 'prompts', name)
  if (!fs.existsSync(p)) throw new Error(`Missing prompt file: ${p}`)
  return fs.readFileSync(p, 'utf8')
}

function buildSystemPrompt(def) {
  return def.promptFiles.map(readPrompt).join('\n\n---\n\n')
}

function resolveVoiceId() {
  return process.env.ELEVENLABS_VOICE_ID || JM_HINDI_VOICE_ID
}

function resolveAgentId(def) {
  for (const key of def.envKeys) {
    if (process.env[key]) return process.env[key]
  }
  return null
}

async function ensureVoiceInAccount(apiKey, voiceId) {
  const check = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
    headers: { 'xi-api-key': apiKey },
  })
  if (check.ok) return voiceId

  const shared = await elRequest(
    apiKey,
    'GET',
    `https://api.elevenlabs.io/v1/shared-voices?page_size=100&language=hi`,
  )
  const hit = shared?.voices?.find((v) => v.voice_id === voiceId)
  if (!hit?.public_owner_id) {
    throw new Error(`Voice ${voiceId} not in workspace and not found in shared library`)
  }

  await elRequest(apiKey, 'POST', `https://api.elevenlabs.io/v1/voices/add/${hit.public_owner_id}/${voiceId}`, {
    new_name: 'JM Hindi Counter',
  })
  console.log(`Added shared voice ${voiceId} (${hit.name}) to workspace`)
  return voiceId
}

async function elRequest(apiKey, method, url, body) {
  const resp = await fetch(url, {
    method,
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: body == null ? undefined : JSON.stringify(body),
  })
  const text = await resp.text()
  if (!resp.ok) throw new Error(`ElevenLabs ${resp.status}: ${text.slice(0, 600)}`)
  return text ? JSON.parse(text) : null
}

function buildBody(def, systemPrompt, voiceId) {
  return {
    name: def.name,
    conversation_config: {
      conversation: { max_duration_seconds: 600 },
      turn: {
        turn_timeout: def.turnTimeout,
        silence_end_call_timeout: def.silenceTimeout,
        turn_eagerness: def.turnEagerness,
        speculative_turn: def.speculativeTurn,
        soft_timeout_config: {
          timeout_seconds: def.softTimeoutSecs,
          message: def.softTimeoutMessage,
          use_llm_generated_message: false,
        },
      },
      agent: {
        first_message: def.firstMessageHi,
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
        hi: { overrides: { agent: { first_message: def.firstMessageHi } } },
        en: { overrides: { agent: { first_message: def.firstMessageEn } } },
      },
      tts: {
        model_id: 'eleven_flash_v2_5',
        voice_id: voiceId,
        speed: def.ttsSpeed,
      },
    },
  }
}

async function setupAgent(apiKey, voiceId, def) {
  const systemPrompt = buildSystemPrompt(def)
  const body = buildBody(def, systemPrompt, voiceId)

  let agentId = resolveAgentId(def)

  if (agentId) {
    console.log(`[${def.key}] Patching existing agent ${agentId}...`)
    await elRequest(apiKey, 'PATCH', `https://api.elevenlabs.io/v1/convai/agents/${agentId}`, body)
  } else {
    const list = await elRequest(
      apiKey,
      'GET',
      `https://api.elevenlabs.io/v1/convai/agents?page_size=100&search=${encodeURIComponent(def.name)}`,
    )
    const agents = list?.agents ?? []
    const existing = agents.find((a) => a.name?.toLowerCase() === def.name.toLowerCase())

    if (existing?.agent_id) {
      agentId = existing.agent_id
      console.log(`[${def.key}] Found agent ${agentId}, patching...`)
      await elRequest(apiKey, 'PATCH', `https://api.elevenlabs.io/v1/convai/agents/${agentId}`, body)
    } else {
      console.log(`[${def.key}] Creating new agent...`)
      const created = await elRequest(apiKey, 'POST', 'https://api.elevenlabs.io/v1/convai/agents/create', body)
      agentId = created?.agent_id
      if (!agentId) throw new Error('Create did not return agent_id')
      console.log(`[${def.key}] Created agent ${agentId}`)
    }
  }

  const snapshotPath = path.join(
    root,
    'workflows/elevenlabs/agents',
    def.snapshotDir,
    'agent-config.snapshot.json',
  )
  const snapshot = {
    agent_id: agentId,
    agent_key: def.key,
    agent_name: def.name,
    voice_id: voiceId,
    llm: 'claude-sonnet-4',
    tts_model: 'eleven_flash_v2_5',
    tts_speed: def.ttsSpeed,
    turn_eagerness: def.turnEagerness,
    languages: ['hi', 'en', 'hinglish'],
    prompt_version: def.promptVersion,
    catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v2',
    updated_at: new Date().toISOString(),
  }

  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), 'utf8')

  console.log(`\n--- ${def.name} ready ---`)
  console.log(`${def.envKeys[0]}=${agentId}`)
  if (def.key === 'priya') console.log(`ELEVENLABS_AGENT_ID=${agentId}`)
  console.log(`Prompt: ${def.promptVersion}`)
  console.log(`Snapshot: ${snapshotPath}`)

  return agentId
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    console.error('Missing ELEVENLABS_API_KEY in .env.local')
    process.exit(1)
  }

  const generated = path.join(root, 'prompts/jm-catalog-knowledge.generated.md')
  if (!fs.existsSync(generated)) {
    console.error('Run from repo root: node scripts/generate-catalog-knowledge.mjs')
    process.exit(1)
  }

  const voiceId = resolveVoiceId()
  await ensureVoiceInAccount(apiKey, voiceId)

  const keys = parseAgentArg()
  for (const key of keys) {
    await setupAgent(apiKey, voiceId, AGENTS[key])
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
