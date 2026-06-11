import SectionHead from '../sandy/SectionHead'
import StatusChip from '../sandy/StatusChip'
import { actionItems } from '@/data/actions'

export default function ActionTracker() {
  return (
    <section>
      <SectionHead eyebrow="Actions" title="Action tracker" />
      <div className="space-y-2">
        {actionItems.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-start gap-3 p-4 rounded-xl border"
            style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
          >
            <StatusChip status={a.status} />
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm font-medium">{a.item}</p>
              <p className="mono text-[10px] mt-1" style={{ color: 'var(--color-sandy-ink-faint)' }}>
                {a.owner}{a.due ? ` · ${a.due}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
