import type { RoadmapPhase } from '@/data/commerce-roadmap'
import { flexibleScopeNote } from '@/data/commerce-roadmap'
import RoadmapUnlockHeadline from './RoadmapUnlockHeadline'
import RoadmapInputGoals from './RoadmapInputGoals'
import RoadmapDirectionalList from './RoadmapDirectionalList'

type Props = {
  phase: RoadmapPhase
}

export default function RoadmapPhaseBlock({ phase }: Props) {
  return (
    <div className="rm-block" role="tabpanel">
      <RoadmapUnlockHeadline>{phase.unlockStatement}</RoadmapUnlockHeadline>

      <div className="rm-meta-row">
        <span className="rm-phase-weeks">{phase.duration}</span>
        {phase.flexibleScope && <span className="rm-flex-badge">Flexible scope</span>}
      </div>

      {phase.inputGoals && phase.inputGoals.length > 0 && (
        <RoadmapInputGoals goals={phase.inputGoals} showTbd={phase.inputGoalsTbd} />
      )}

      {phase.directionalScope && phase.directionalScope.length > 0 && (
        <RoadmapDirectionalList items={phase.directionalScope} />
      )}

      {phase.flexibleScope && <p className="rm-flex-note">{flexibleScopeNote}</p>}
    </div>
  )
}
