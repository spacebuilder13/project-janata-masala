import { motion } from 'framer-motion'
import { fadeRise, stagger } from '@/components/sandy/motion'
import AnchorNav from '@/components/sandy/AnchorNav'
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
    <div>
      <AnchorNav sections={sections} />
      <div className="px-6 py-12 md:px-12 md:py-16 max-w-4xl mx-auto space-y-16">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: stagger(0.06) } }}>
          <motion.p variants={fadeRise} className="mono" style={{ color: 'var(--color-jm-spice)' }}>01 — Adventure</motion.p>
          <motion.h1 variants={fadeRise} className="serif text-4xl md:text-5xl mt-3">Moderning Janata Masala</motion.h1>
          <motion.p variants={fadeRise} className="mt-4 text-sm max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
            Founder liberation through brand as operating system — strategy, roadmap, and shared decisions with the S&A team.
          </motion.p>

          <div id="north-star" className="mt-10 scroll-mt-32">
            <NorthStarBanner />
          </div>
          <div id="pillars" className="mt-16 scroll-mt-32"><PillarCards /></div>
          <div id="roadmap" className="mt-16 scroll-mt-32"><RoadmapTimeline /></div>
          <div id="benchmarks" className="mt-16 scroll-mt-32"><BenchmarkStack /></div>

          <div id="meetings" className="mt-16 scroll-mt-32">
            <h2 className="serif text-2xl mb-6">Meetings</h2>
            <div className="space-y-6">
              {meetings.map((m) => <MeetingCard key={m.id} meeting={m} />)}
            </div>
          </div>

          <div id="actions" className="mt-16 scroll-mt-32"><ActionTracker /></div>
          <div id="scope" className="mt-16 scroll-mt-32"><ScopeTracker /></div>
          <div id="questions" className="mt-16 scroll-mt-32"><OpenQuestions /></div>
        </motion.div>
      </div>
    </div>
  )
}
