import type { VoiceAgentKey, VoiceAgentMeta } from '@/data/voice-agents'
import { VOICE_AGENTS } from '@/data/voice-agents'

type Props = {
  selected: VoiceAgentKey
  disabled?: boolean
  onSelect: (key: VoiceAgentKey) => void
}

function AgentCard({
  agent,
  selected,
  disabled,
  onSelect,
}: {
  agent: VoiceAgentMeta
  selected: boolean
  disabled?: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className="voice-agent-card"
      data-selected={selected || undefined}
      aria-pressed={selected}
    >
      <span className="voice-agent-card__label">{agent.label}</span>
      <span className="voice-agent-card__tagline">{agent.tagline}</span>
      <span className="voice-agent-card__desc">{agent.description}</span>
    </button>
  )
}

export default function AgentPicker({ selected, disabled, onSelect }: Props) {
  return (
    <div className="voice-agent-picker">
      <p className="caption-label caption-label--spice mb-3">Choose your counter</p>
      <div className="voice-agent-picker__grid">
        {VOICE_AGENTS.map((agent) => (
          <AgentCard
            key={agent.key}
            agent={agent}
            selected={selected === agent.key}
            disabled={disabled}
            onSelect={() => onSelect(agent.key)}
          />
        ))}
      </div>
    </div>
  )
}
