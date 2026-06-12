import SectionHead from '../sandy/SectionHead'
import StatusChip from '../sandy/StatusChip'
import { scopeItems } from '@/data/adventure'

export default function ScopeTracker({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Scope" title="Scope tracker" />
      <div className="list-stack">
        {scopeItems.map((s) => (
          <div key={s.id} className="list-row">
            <StatusChip status={s.status} />
            <div className="list-row-body">
              <p className="list-row-title">{s.area}</p>
              <p className="list-row-text mt-1">{s.description}</p>
              {s.phase && <p className="list-row-meta">{s.phase}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
