import type { Phase1Segment } from '@/data/commerce-roadmap'
import { segmentMeta } from '@/data/commerce-roadmap'

type Props = {
  segment: Phase1Segment
}

export default function RoadmapSegmentColumn({ segment }: Props) {
  const { colorVar } = segmentMeta[segment.id]

  return (
    <article className="rm-segment-col">
      <header
        className="rm-segment-header"
        style={{ borderTopColor: `var(${colorVar})` }}
      >
        <h3 className="rm-segment-title">{segment.title}</h3>
      </header>
      <div className="rm-segment-body">
        {segment.intro && <p className="rm-segment-intro">{segment.intro}</p>}

        {segment.primaryDeliverable && (
          <div className="rm-primary-deliverable">
            <p className="rm-primary-deliverable-label">Primary deliverable</p>
            <p className="rm-primary-deliverable-text">{segment.primaryDeliverable}</p>
          </div>
        )}

        {segment.items.length > 0 && (
          <div className="rm-item-list">
            {segment.bookContentsLabel && (
              <p className="rm-item-list-label">{segment.bookContentsLabel}</p>
            )}
            {segment.items.map((item) => (
              <div key={item.text} className="rm-item">
                {item.text}
                {item.note && <span className="rm-item-note">{item.note}</span>}
              </div>
            ))}
          </div>
        )}

        {segment.footnote && <p className="rm-footnote">{segment.footnote}</p>}

        {segment.movedToPhase2 && segment.movedToPhase2.length > 0 && (
          <div className="rm-moved-panel">
            <p className="rm-moved-label">Items moved to Phase 2</p>
            <ul className="rm-moved-list">
              {segment.movedToPhase2.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
