import type { RoadmapPhase } from '@/data/commerce-roadmap'
import RoadmapUnlockHeadline from './RoadmapUnlockHeadline'
import RoadmapScopeBadge from './RoadmapScopeBadge'
import RoadmapSegmentColumn from './RoadmapSegmentColumn'

type Props = {
  phase: RoadmapPhase
}

export default function RoadmapPhase1Matrix({ phase }: Props) {
  if (!phase.segments) return null

  return (
    <div className="rm-phase-panel" role="tabpanel">
      <RoadmapUnlockHeadline>{phase.unlockStatement}</RoadmapUnlockHeadline>

      <div className="rm-meta-row">
        {phase.scopeBadge === 'active' && <RoadmapScopeBadge />}
        <span className="rm-phase-weeks">{phase.duration}</span>
      </div>

      <p className="rm-objective">{phase.objective}</p>

      <div className="rm-matrix">
        {phase.segments.map((segment) => (
          <RoadmapSegmentColumn key={segment.id} segment={segment} />
        ))}
      </div>
    </div>
  )
}
