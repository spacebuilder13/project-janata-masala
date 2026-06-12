export type VoiceAgentKey = 'priya' | 'meera'

export type VoiceAgentDefinition = {
  key: VoiceAgentKey
  label: string
  tagline: string
  description: string
  promptVersion: string
  envKeys: string[]
}

export const VOICE_AGENTS: Record<VoiceAgentKey, VoiceAgentDefinition> = {
  priya: {
    key: 'priya',
    label: 'Priya',
    tagline: 'Fast list-dump',
    description:
      'Janta Stores speed — dump your list, get a bill. No upsell, no inventory tour. Says "Janta Masala".',
    promptVersion: 'v1.2.0-priya',
    envKeys: ['ELEVENLABS_AGENT_ID_PRIYA', 'ELEVENLABS_AGENT_ID'],
  },
  meera: {
    key: 'meera',
    label: 'Meera',
    tagline: 'Warm counter expert',
    description:
      'Knows the shop — inventory, new launches, pairings, and "aur kuch?" before she closes the bill.',
    promptVersion: 'v2.0.0-meera',
    envKeys: ['ELEVENLABS_AGENT_ID_MEERA'],
  },
}

export const DEFAULT_VOICE_AGENT: VoiceAgentKey = 'priya'

export function resolveVoiceAgentKey(raw: unknown): VoiceAgentKey {
  if (raw === 'meera' || raw === 'priya') return raw
  return DEFAULT_VOICE_AGENT
}

export function resolveAgentId(key: VoiceAgentKey): string | null {
  const def = VOICE_AGENTS[key]
  for (const envKey of def.envKeys) {
    const val = process.env[envKey]?.trim()
    if (val) return val
  }
  return null
}
