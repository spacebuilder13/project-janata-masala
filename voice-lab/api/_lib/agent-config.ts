/** Shared ElevenLabs agent configs — keep in sync with scripts/create-or-patch-agent.js */

export const JM_HINDI_VOICE_ID = 'ohvvU75FpBEB8fdaLOMh'

export type AgentKey = 'priya' | 'meera'

export type AgentDefinition = {
  key: AgentKey
  name: string
  promptVersion: string
  envVar: string
  firstMessageHi: string
  firstMessageEn: string
  turnEagerness: 'eager' | 'normal' | 'patient'
  ttsSpeed: number
  speculativeTurn: boolean
  softTimeoutMessage: string
  buildPromptFiles: string[]
}

export const AGENTS: Record<AgentKey, AgentDefinition> = {
  priya: {
    key: 'priya',
    name: 'JM Priya — List Dump',
    promptVersion: 'v1.2.0-priya',
    envVar: 'ELEVENLABS_AGENT_ID_PRIYA',
    firstMessageHi: 'Janta Masala — boliye, kya chahiye?',
    firstMessageEn: 'Janta Masala — what do you need today?',
    turnEagerness: 'eager',
    ttsSpeed: 1.08,
    speculativeTurn: true,
    softTimeoutMessage: 'Haan, sun rahi hoon.',
    buildPromptFiles: ['jm-voice-priya-system.md', 'jm-voice-closure.md', 'jm-catalog-rules.md'],
  },
  meera: {
    key: 'meera',
    name: 'JM Meera — Counter Expert',
    promptVersion: 'v2.0.0-meera',
    envVar: 'ELEVENLABS_AGENT_ID_MEERA',
    firstMessageHi:
      'Namaste! Janta Masala — Meera bol rahi hoon. Aaj kya chahiye, seedha list bhi chalegi.',
    firstMessageEn: 'Hello! Janta Masala — Meera here. What would you like today?',
    turnEagerness: 'normal',
    ttsSpeed: 0.98,
    speculativeTurn: false,
    softTimeoutMessage: 'Ji, sun rahi hoon…',
    buildPromptFiles: [
      'jm-voice-meera-system.md',
      'jm-voice-meera-pairings.md',
      'jm-voice-meera-closure.md',
      'jm-catalog-knowledge.generated.md',
    ],
  },
}

export function resolveVoiceId(envVoice?: string): string {
  return envVoice || JM_HINDI_VOICE_ID
}

export function buildConversationConfig(def: AgentDefinition, systemPrompt: string, voiceId: string) {
  return {
    conversation: { max_duration_seconds: 600 },
    turn: {
      turn_timeout: def.key === 'meera' ? 7 : 5,
      silence_end_call_timeout: def.key === 'meera' ? 18 : 12,
      turn_eagerness: def.turnEagerness,
      speculative_turn: def.speculativeTurn,
      soft_timeout_config: {
        timeout_seconds: def.key === 'meera' ? 6 : 4,
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
      hi: {
        overrides: {
          agent: { first_message: def.firstMessageHi },
        },
      },
      en: {
        overrides: {
          agent: { first_message: def.firstMessageEn },
        },
      },
    },
    tts: {
      model_id: 'eleven_flash_v2_5',
      voice_id: voiceId,
      speed: def.ttsSpeed,
    },
  }
}

export function buildAgentPatchBody(def: AgentDefinition, systemPrompt: string, voiceId: string) {
  return {
    name: def.name,
    conversation_config: buildConversationConfig(def, systemPrompt, voiceId),
  }
}

/** @deprecated use AGENTS.priya */
export const AGENT_NAME = AGENTS.priya.name
export const FIRST_MESSAGE_HI = AGENTS.priya.firstMessageHi
export const FIRST_MESSAGE_EN = AGENTS.priya.firstMessageEn
