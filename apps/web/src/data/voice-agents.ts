export type VoiceAgentKey = 'priya' | 'meera'

export type VoiceAgentMeta = {
  key: VoiceAgentKey
  label: string
  tagline: string
  description: string
  promptVersion: string
}

export const VOICE_AGENTS: VoiceAgentMeta[] = [
  {
    key: 'priya',
    label: 'Priya',
    tagline: 'Fast list-dump',
    description:
      'Janta Stores speed — dump your list, get a bill. No upsell, no inventory tour.',
    promptVersion: 'v1.2.0-priya',
  },
  {
    key: 'meera',
    label: 'Meera',
    tagline: 'Warm counter expert',
    description:
      'Knows inventory, new launches, pairings, and asks "aur kuch?" before closing.',
    promptVersion: 'v2.0.0-meera',
  },
]

export const DEFAULT_VOICE_AGENT: VoiceAgentKey = 'priya'

export function getVoiceAgent(key: VoiceAgentKey): VoiceAgentMeta {
  return VOICE_AGENTS.find((a) => a.key === key) ?? VOICE_AGENTS[0]
}
