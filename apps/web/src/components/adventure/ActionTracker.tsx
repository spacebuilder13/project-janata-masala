import SectionHead from '../sandy/SectionHead'
import StatusChip from '../sandy/StatusChip'
import { actionItems } from '@/data/actions'

export default function ActionTracker({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Actions" title="Action tracker" />
      <div className="list-stack">
        {actionItems.map((a) => (
          <div key={a.id} className="list-row">
            <StatusChip status={a.status} />
            <div className="list-row-body">
              <p className="list-row-title">{a.item}</p>
              <p className="list-row-meta">
                {a.owner}{a.due ? ` · ${a.due}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
