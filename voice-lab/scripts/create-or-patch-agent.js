#!/usr/bin/env node
/**
 * Create or patch ElevenLabs ConvAI agent for JM Voice Lab.
 * Usage: node scripts/create-or-patch-agent.js
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import './_load-env.js'

const AGENT_NAME = 'JM Voice Lab B2C v1'
const JM_HINDI_VOICE_ID = 'ohvvU75FpBEB8fdaLOMh'
const FIRST_MESSAGE_HI = 'Haan bhai, Janata Masala — boliye, kya chahiye?'
const FIRST_MESSAGE_EN = 'Janata Masala — what do you need today?'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const snapshotPath = path.join(root, 'workflows/elevenlabs/agents/jm-v1/agent-config.snapshot.json')

function readPrompt(name) {
  return fs.readFileSync(path.join(root, 'prompts', name), 'utf8')
}

function buildSystemPrompt() {
  return [readPrompt('jm-voice-system.md'), readPrompt('jm-voice-closure.md'), readPrompt('jm-catalog-rules.md')].join(
    '\n\n---\n\n',
  )
}

function resolveVoiceId() {
  return process.env.ELEVENLABS_VOICE_ID || JM_HINDI_VOICE_ID
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

function buildBody(systemPrompt, voiceId) {
  return {
    name: AGENT_NAME,
    conversation_config: {
      conversation: { max_duration_seconds: 600 },
      turn: {
        turn_timeout: 5,
        silence_end_call_timeout: 12,
        turn_eagerness: 'eager',
        speculative_turn: true,
        soft_timeout_config: {
          timeout_seconds: 4,
          message: 'Haan, sun raha hoon.',
          use_llm_generated_message: false,
        },
      },
      agent: {
        first_message: FIRST_MESSAGE_HI,
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
        hi: { overrides: { agent: { first_message: FIRST_MESSAGE_HI } } },
        en: { overrides: { agent: { first_message: FIRST_MESSAGE_EN } } },
      },
      tts: {
        model_id: 'eleven_flash_v2_5',
        voice_id: voiceId,
        speed: 1.08,
      },
    },
  }
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    console.error('Missing ELEVENLABS_API_KEY in .env.local')
    process.exit(1)
  }

  const systemPrompt = buildSystemPrompt()
  const voiceId = resolveVoiceId()
  await ensureVoiceInAccount(apiKey, voiceId)
  const body = buildBody(systemPrompt, voiceId)

  let agentId = process.env.ELEVENLABS_AGENT_ID

  if (agentId) {
    console.log(`Patching existing agent ${agentId}...`)
    await elRequest(apiKey, 'PATCH', `https://api.elevenlabs.io/v1/convai/agents/${agentId}`, body)
  } else {
    const list = await elRequest(
      apiKey,
      'GET',
      `https://api.elevenlabs.io/v1/convai/agents?page_size=100&search=${encodeURIComponent(AGENT_NAME)}`,
    )
    const agents = list?.agents ?? []
    const existing = agents.find((a) => a.name?.toLowerCase() === AGENT_NAME.toLowerCase())

    if (existing?.agent_id) {
      agentId = existing.agent_id
      console.log(`Found agent ${agentId}, patching...`)
      await elRequest(apiKey, 'PATCH', `https://api.elevenlabs.io/v1/convai/agents/${agentId}`, body)
    } else {
      console.log('Creating new agent...')
      const created = await elRequest(apiKey, 'POST', 'https://api.elevenlabs.io/v1/convai/agents/create', body)
      agentId = created?.agent_id
      if (!agentId) throw new Error('Create did not return agent_id')
      console.log(`Created agent ${agentId}`)
    }
  }

  const promptVersion = process.env.JM_PROMPT_VERSION || 'v1.1.0'
  const snapshot = {
    agent_id: agentId,
    agent_name: AGENT_NAME,
    voice_id: voiceId,
    llm: 'claude-sonnet-4',
    tts_model: 'eleven_flash_v2_5',
    tts_speed: 1.08,
    turn_eagerness: 'eager',
    languages: ['hi', 'en', 'hinglish'],
    prompt_version: promptVersion,
    catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v1',
    updated_at: new Date().toISOString(),
  }

  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), 'utf8')

  console.log('\n--- Agent ready (v1.1 tune) ---')
  console.log(`ELEVENLABS_AGENT_ID=${agentId}`)
  console.log(`ELEVENLABS_VOICE_ID=${voiceId}`)
  console.log(`Prompt: ${promptVersion}`)
  console.log(`Snapshot: ${snapshotPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
