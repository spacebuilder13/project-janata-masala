import SectionHead from '../sandy/SectionHead'
import StatusChip from '../sandy/StatusChip'
import { scopeItems } from '@/data/adventure'

export default function ScopeTracker() {
  return (
    <section>
      <SectionHead eyebrow="Scope" title="Scope tracker" />
      <div className="space-y-3">
        {scopeItems.map((s) => (
          <div key={s.id} className="flex items-start gap-4 p-4 rounded-xl border" style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}>
            <StatusChip status={s.status} />
            <div>
              <p className="font-medium text-sm">{s.area}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-sandy-ink-soft)' }}>{s.description}</p>
              {s.phase && <p className="mono text-[10px] mt-1" style={{ color: 'var(--color-sandy-ink-faint)' }}>{s.phase}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
