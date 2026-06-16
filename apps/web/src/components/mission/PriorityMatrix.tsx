import { useState } from 'react'
import { matrixRule, priorityMatrix } from '@/data/operating-stack-brief'

export default function PriorityMatrix() {
  const [expanded, setExpanded] = useState<string | null>('priority')

  const byId = Object.fromEntries(priorityMatrix.map((q) => [q.id, q]))

  return (
    <div className="mc-matrix">
      <div className="mc-matrix-axis-row">
        <span className="mc-matrix-corner" />
        <span className="mc-matrix-axis-h">Low impact</span>
        <span className="mc-matrix-axis-h">High impact</span>
      </div>
      <div className="mc-matrix-axis-row">
        <span className="mc-matrix-axis-v">High adoption</span>
        <MatrixCell
          quadrant={byId.hygiene}
          expanded={expanded === 'hygiene'}
          onToggle={() => setExpanded(expanded === 'hygiene' ? null : 'hygiene')}
        />
        <MatrixCell
          quadrant={byId.priority}
          expanded={expanded === 'priority'}
          onToggle={() => setExpanded(expanded === 'priority' ? null : 'priority')}
        />
      </div>
      <div className="mc-matrix-axis-row">
        <span className="mc-matrix-axis-v">Low adoption</span>
        <MatrixCell
          quadrant={byId.experiments}
          expanded={expanded === 'experiments'}
          onToggle={() => setExpanded(expanded === 'experiments' ? null : 'experiments')}
        />
        <MatrixCell
          quadrant={byId.bets}
          expanded={expanded === 'bets'}
          onToggle={() => setExpanded(expanded === 'bets' ? null : 'bets')}
        />
      </div>
      <p className="caption-text mt-4">{matrixRule}</p>
    </div>
  )
}

function MatrixCell({
  quadrant,
  expanded,
  onToggle,
}: {
  quadrant: (typeof priorityMatrix)[number]
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className={`mc-matrix-cell${quadrant.highlight ? ' mc-matrix-cell--hot' : ''}${expanded ? ' mc-matrix-cell--expanded' : ''}`}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      <span className="mc-matrix-cell-title">{quadrant.title}</span>
      {expanded && <span className="mc-matrix-cell-examples">{quadrant.examples}</span>}
      {!expanded && <span className="mc-matrix-cell-hint">Tap to expand</span>}
    </button>
  )
}
