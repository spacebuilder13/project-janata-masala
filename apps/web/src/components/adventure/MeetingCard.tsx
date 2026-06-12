import type { Meeting } from '@/data/adventure'

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <article className="surface-card">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="caption-label">{meeting.date}</span>
        <h3 className="serif text-xl">{meeting.title}</h3>
      </div>
      <p className="caption-text mt-2">{meeting.summary}</p>
      <p className="caption-label mt-3">{meeting.attendees.join(' · ')}</p>
      {meeting.decisions.length > 0 && (
        <div className="mt-4">
          <p className="caption-label caption-label--spice mb-2">Decisions</p>
          <ul className="space-y-1 list-row-text">
            {meeting.decisions.map((d) => <li key={d}>• {d}</li>)}
          </ul>
        </div>
      )}
      {meeting.actions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {meeting.actions.map((a) => (
            <span key={a.item} className="tag">
              <strong>{a.owner}:</strong> {a.item}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
