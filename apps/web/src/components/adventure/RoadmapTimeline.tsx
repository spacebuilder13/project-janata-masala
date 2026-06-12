import ExpandableCard from '../sandy/ExpandableCard'
import StatusChip from '../sandy/StatusChip'
import SectionHead from '../sandy/SectionHead'
import { phases } from '@/data/roadmap'

export default function RoadmapTimeline({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Roadmap" title="Three-phase modernization" blurb="NLM-grounded timeline from discovery sessions." />
      <div className="flex flex-col gap-4">
        {phases.map((p) => (
          <ExpandableCard
            key={p.id}
            title={`Phase ${p.number}: ${p.title}`}
            subtitle={`${p.weeks} · ${p.jmPhase}`}
            defaultOpen={p.number === 1}
          >
            <div className="flex items-center gap-2 mb-3">
              <StatusChip status={p.status} />
            </div>
            <ul className="space-y-2">
              {p.deliverables.map((d) => (
                <li key={d} className="text-sm">• {d}</li>
              ))}
            </ul>
          </ExpandableCard>
        ))}
      </div>
    </section>
  )
}
