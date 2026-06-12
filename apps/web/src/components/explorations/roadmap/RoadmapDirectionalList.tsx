import type { DirectionalItem } from '@/data/commerce-roadmap'
import { segmentMeta } from '@/data/commerce-roadmap'

type Props = {
  items: DirectionalItem[]
}

export default function RoadmapDirectionalList({ items }: Props) {
  return (
    <section>
      <p className="rm-section-label">Directional scope (subject to change)</p>
      <ul className="rm-directional-list">
        {items.map((item) => (
          <li key={item.text} className="rm-directional-item">
            {item.segment && (
              <span
                className="rm-segment-tag"
                style={{ borderTopColor: `var(${segmentMeta[item.segment].colorVar})` }}
              >
                {segmentMeta[item.segment].label}
              </span>
            )}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
