import type { RoadmapPhase } from '@/data/commerce-roadmap'

type Props = {
  phases: RoadmapPhase[]
  active: 1 | 2 | 3
  onChange: (phase: 1 | 2 | 3) => void
}

export default function RoadmapPhaseNav({ phases, active, onChange }: Props) {
  return (
    <div className="rm-phase-rail" role="tablist" aria-label="Roadmap phases">
      {phases.map((p) => (
        <button
          key={p.number}
          type="button"
          role="tab"
          aria-selected={active === p.number}
          className={`rm-phase-tab${active === p.number ? ' rm-phase-tab--active' : ''}`}
          onClick={() => onChange(p.number)}
        >
          <span className="rm-phase-num">{p.label}</span>
          <span className="rm-phase-weeks">{p.duration}</span>
        </button>
      ))}
    </div>
  )
}
