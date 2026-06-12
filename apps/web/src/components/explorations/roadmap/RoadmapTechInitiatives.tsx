import type { TechInitiative } from '@/data/commerce-roadmap'

type Props = {
  initiatives: TechInitiative[]
}

const statusLabel: Record<TechInitiative['status'], string> = {
  active: 'Active',
  planned: 'Planned',
  future: 'Future',
}

export default function RoadmapTechInitiatives({ initiatives }: Props) {
  return (
    <section className="rm-tech-section">
      <p className="rm-section-label">Tech & automation initiatives</p>
      <div className="rm-tech-grid">
        {initiatives.map((item) => (
          <article key={item.title} className="rm-tech-card surface-card">
            <span className={`rm-tech-status rm-tech-status--${item.status}`}>
              {statusLabel[item.status]}
            </span>
            <h4 className="rm-tech-title">{item.title}</h4>
            <p className="caption-text mt-2">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
