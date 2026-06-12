/** Shared ElevenLabs agent config — keep in sync with scripts/create-or-patch-agent.js */

export const AGENT_NAME = 'JM Voice Lab B2C v1'
export const JM_HINDI_VOICE_ID = 'ohvvU75FpBEB8fdaLOMh'

export const FIRST_MESSAGE_HI = 'Haan bhai, Janata Masala — boliye, kya chahiye?'
export const FIRST_MESSAGE_EN = 'Janata Masala — what do you need today?'

export function resolveVoiceId(envVoice?: string): string {
  return envVoice || JM_HINDI_VOICE_ID
}

export function buildConversationConfig(systemPrompt: string, voiceId: string) {
  return {
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
      hi: {
        overrides: {
          agent: { first_message: FIRST_MESSAGE_HI },
        },
      },
      en: {
        overrides: {
          agent: { first_message: FIRST_MESSAGE_EN },
        },
      },
    },
    tts: {
      model_id: 'eleven_flash_v2_5',
      voice_id: voiceId,
      speed: 1.08,
    },
  }
}

export function buildAgentPatchBody(systemPrompt: string, voiceId: string) {
  return {
    name: AGENT_NAME,
    conversation_config: buildConversationConfig(systemPrompt, voiceId),
  }
}
