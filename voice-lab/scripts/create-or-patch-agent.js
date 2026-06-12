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

async function pickVoice(apiKey) {
  const envVoice = process.env.ELEVENLABS_VOICE_ID
  if (envVoice) return envVoice
  const data = await elRequest(apiKey, 'GET', 'https://api.elevenlabs.io/v1/voices?page_size=100')
  const voices = data?.voices ?? []
  const preferred = voices.find((v) =>
    /india|hindi|indian|priya|rachel|warm/i.test(`${v.name} ${v.labels?.accent ?? ''}`),
  )
  return preferred?.voice_id ?? voices[0]?.voice_id ?? null
}

function buildBody(systemPrompt, voiceId) {
  return {
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
        first_message: 'Namaste! Janata Masala se bol rahi hoon. Aaj kya chahiye? List bata dijiye.',
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
        hi: { overrides: { agent: { first_message: 'Namaste! Janata Masala se. Aaj kya chahiye?' } } },
        en: { overrides: { agent: { first_message: 'Hello from Janata Masala! What would you like today?' } } },
      },
      tts: {
        model_id: 'eleven_flash_v2_5',
        ...(voiceId ? { voice_id: voiceId } : {}),
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
  const voiceId = await pickVoice(apiKey)
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

  const snapshot = {
    agent_id: agentId,
    agent_name: AGENT_NAME,
    voice_id: voiceId,
    llm: 'claude-sonnet-4',
    tts_model: 'eleven_flash_v2_5',
    languages: ['gu', 'hi', 'mr', 'en', 'hinglish'],
    prompt_version: process.env.JM_PROMPT_VERSION || 'v1.0.0',
    catalog_version: process.env.JM_CATALOG_VERSION || 'demo-v1',
    updated_at: new Date().toISOString(),
  }

  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), 'utf8')

  console.log('\n--- Agent ready ---')
  console.log(`ELEVENLABS_AGENT_ID=${agentId}`)
  console.log(`Voice: ${voiceId ?? 'default'}`)
  console.log(`Snapshot: ${snapshotPath}`)
  console.log('\nAdd ELEVENLABS_AGENT_ID to voice-lab/.env.local if not already set.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
