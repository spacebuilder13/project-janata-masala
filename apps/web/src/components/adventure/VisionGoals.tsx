import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import ConversionBarChart from './ConversionBarChart'
import { visionGoals } from '@/data/commerce-101-brief'

export default function VisionGoals({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Vision" title="Where we want to go" />
      <motion.div
        className="grid md:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {visionGoals.map((g) => (
          <motion.article key={g.id} variants={fadeRise} className="surface-card">
            <h3 className="serif text-xl">{g.title}</h3>
            <p className="caption-text mt-2">{g.body}</p>
          </motion.article>
        ))}
      </motion.div>
      <div className="mt-8">
        <ConversionBarChart />
      </div>
    </section>
  )
}
