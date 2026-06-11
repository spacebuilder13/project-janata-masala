import type { Meeting } from '@/data/adventure'

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <article className="p-6 rounded-2xl border" style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="mono text-[11px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>{meeting.date}</span>
        <h3 className="serif text-xl">{meeting.title}</h3>
      </div>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{meeting.summary}</p>
      <p className="mt-3 mono text-[11px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>{meeting.attendees.join(' · ')}</p>
      {meeting.decisions.length > 0 && (
        <div className="mt-4">
          <p className="mono text-[11px] mb-2" style={{ color: 'var(--color-jm-spice)' }}>Decisions</p>
          <ul className="space-y-1 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
            {meeting.decisions.map((d) => <li key={d}>• {d}</li>)}
          </ul>
        </div>
      )}
      {meeting.actions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {meeting.actions.map((a) => (
            <span key={a.item} className="px-3 py-1.5 rounded-full border text-xs" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}>
              <strong>{a.owner}:</strong> {a.item}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
