import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import SectionHead from '@/components/sandy/SectionHead'
import NorthStarBanner from '@/components/adventure/NorthStarBanner'
import PillarCards from '@/components/adventure/PillarCards'
import RoadmapTimeline from '@/components/adventure/RoadmapTimeline'
import BenchmarkStack from '@/components/adventure/BenchmarkStack'
import ActionTracker from '@/components/adventure/ActionTracker'
import MeetingCard from '@/components/adventure/MeetingCard'
import ScopeTracker from '@/components/adventure/ScopeTracker'
import OpenQuestions from '@/components/adventure/OpenQuestions'
import { meetings } from '@/data/adventure'

const sections = [
  { id: 'north-star', label: 'North star' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'actions', label: 'Actions' },
  { id: 'scope', label: 'Scope' },
  { id: 'questions', label: 'Questions' },
]

export default function Adventure() {
  return (
    <PageShell variant="scroll" anchorSections={sections}>
      <PageIntro
        eyebrow="01 — Adventure"
        title="Modernizing Janata Masala"
        sub="Founder liberation through brand as operating system — strategy, roadmap, and shared decisions with the S&A team."
        accent="spice"
        wide
      />

      <div className="jm-section">
        <NorthStarBanner sectionId="north-star" />
      </div>
      <div className="jm-section"><PillarCards sectionId="pillars" /></div>
      <div className="jm-section"><RoadmapTimeline sectionId="roadmap" /></div>
      <div className="jm-section"><BenchmarkStack sectionId="benchmarks" /></div>

      <div className="jm-section">
        <SectionHead id="meetings" eyebrow="Meetings" title="Discovery sessions" />
        <div className="flex flex-col gap-6">
          {meetings.map((m) => <MeetingCard key={m.id} meeting={m} />)}
        </div>
      </div>

      <div className="jm-section"><ActionTracker sectionId="actions" /></div>
      <div className="jm-section"><ScopeTracker sectionId="scope" /></div>
      <div className="jm-section"><OpenQuestions sectionId="questions" /></div>
    </PageShell>
  )
}
