import type { RoadmapPhase } from '@/data/commerce-roadmap'
import RoadmapUnlockHeadline from './RoadmapUnlockHeadline'
import RoadmapScopeBadge from './RoadmapScopeBadge'
import RoadmapSegmentColumn from './RoadmapSegmentColumn'
import RoadmapTechInitiatives from './RoadmapTechInitiatives'

type Props = {
  phase: RoadmapPhase
}

export default function RoadmapPhase1Matrix({ phase }: Props) {
  if (!phase.segments) return null

  const matrixClass =
    phase.segments.length === 3 ? 'rm-matrix rm-matrix--3' : 'rm-matrix'

  return (
    <div className="rm-phase-panel" role="tabpanel">
      <RoadmapUnlockHeadline>{phase.unlockStatement}</RoadmapUnlockHeadline>

      <div className="rm-meta-row">
        {phase.scopeBadge === 'active' && <RoadmapScopeBadge />}
        <span className="rm-phase-weeks">{phase.duration}</span>
      </div>

      <p className="rm-objective">{phase.objective}</p>

      <div className={matrixClass}>
        {phase.segments.map((segment) => (
          <RoadmapSegmentColumn key={segment.id} segment={segment} />
        ))}
      </div>

      {phase.techInitiatives && phase.techInitiatives.length > 0 && (
        <RoadmapTechInitiatives initiatives={phase.techInitiatives} />
      )}
    </div>
  )
}
