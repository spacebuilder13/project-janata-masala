import { bestBets, nextActions } from '@/data/mission-center'

type Props = {
  onOpenRoadmap?: () => void
}

export default function BestBetsConclusion({ onOpenRoadmap }: Props) {
  return (
    <div className="mc-best-bets">
      <h3 className="serif text-xl">Suggested next course of action</h3>
      <p className="caption-text mt-2 mb-4">
        Best bets from the priority quadrant — where adoption confidence and business impact align.
      </p>

      <div className="mc-best-bets-grid">
        {bestBets.slice(0, 4).map((b) => (
          <article key={b.capability} className="mc-best-bet-card surface-card">
            <span className="caption-label caption-label--spice">{b.capability}</span>
            <p className="caption-text mt-2">{b.recommendation}</p>
          </article>
        ))}
      </div>

      <div className="mc-next-actions">
        {nextActions.map((a) => (
          <article key={a.id} className="mc-next-action surface-card">
            <div className="mc-next-action-head">
              <h4 className="serif text-base">{a.title}</h4>
              <span className="mc-next-action-owner">{a.owner}</span>
            </div>
            <p className="caption-text mt-2">{a.body}</p>
            {a.tabLink === 'roadmap' && onOpenRoadmap && (
              <button type="button" className="mc-next-action-link" onClick={onOpenRoadmap}>
                Open Falcon Roadmap →
              </button>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
