import { crawlWalkRun } from '@/data/commerce-101-brief'
import { northStar } from '@/data/strategy'
import { falcon2026 } from '@/data/mission-center'

const statusClass: Record<string, string> = {
  active: 'adv-cwr-step--active',
  planned: 'adv-cwr-step--planned',
  deferred: 'adv-cwr-step--deferred',
}

export default function MissionStrategyPanel() {
  return (
    <>
      <p className="caption-text">{falcon2026.v2Context}</p>
      <div className="mc-strategy-thesis surface-card mt-4">
        <p className="caption-label caption-label--spice">Thesis</p>
        <p className="caption-text mt-2">{northStar.thesis}</p>
        <p className="caption-text mt-2" style={{ color: 'var(--color-sandy-ink-faint)' }}>
          {northStar.context}
        </p>
      </div>
      <div className="adv-cwr-strip mt-6">
        {crawlWalkRun.map((step) => (
          <article key={step.id} className={`adv-cwr-step surface-card ${statusClass[step.status]}`}>
            <span className="caption-label caption-label--spice">{step.phase}</span>
            <h3 className="serif text-lg mt-2">{step.title}</h3>
            <p className="caption-text mt-2">{step.summary}</p>
            <ul className="adv-cwr-items">
              {step.items.slice(0, step.status === 'active' ? 4 : 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  )
}
