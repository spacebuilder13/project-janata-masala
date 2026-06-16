import { momentumCompact } from '@/data/mission-center'
import PriorityMatrix from './PriorityMatrix'
import BestBetsConclusion from './BestBetsConclusion'

type Props = {
  onOpenRoadmap: () => void
}

export default function MissionMomentumPanel({ onOpenRoadmap }: Props) {
  return (
    <>
      <div className="mc-momentum-compact">
        {momentumCompact.map((m) => (
          <article key={m.title} className="mc-momentum-card surface-card">
            <h3 className="serif text-base">{m.title}</h3>
            <p className="caption-text mt-2">{m.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="serif text-lg mb-3">Adoption × impact</h3>
        <PriorityMatrix />
      </div>
      <div>
        <BestBetsConclusion onOpenRoadmap={onOpenRoadmap} />
      </div>
    </>
  )
}
