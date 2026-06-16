import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import ConversionBarChart from './ConversionBarChart'
import { visionFootnote, visionGoals } from '@/data/commerce-101-brief'

export default function VisionGoals({ sectionId, embedded }: { sectionId?: string; embedded?: boolean }) {
  return (
    <section className={embedded ? 'mc-embedded-panel' : undefined}>
      {!embedded && <SectionHead id={sectionId} eyebrow="Vision" title="Where we want to go" />}
      <p className={`caption-text${embedded ? ' mb-4' : ' mb-6'} max-w-[62ch]`}>{visionFootnote}</p>
      <motion.div
        className="grid md:grid-cols-2 gap-4"
        initial="hidden"
        animate={embedded ? 'show' : undefined}
        whileInView={embedded ? undefined : 'show'}
        viewport={embedded ? undefined : { once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {visionGoals.map((g) => (
          <motion.article key={g.id} variants={fadeRise} className="surface-card">
            <h3 className="serif text-xl">{g.title}</h3>
            <p className="caption-text mt-2">{g.body}</p>
          </motion.article>
        ))}
      </motion.div>
      <div className={embedded ? 'mt-4' : 'mt-8'}>
        <ConversionBarChart />
      </div>
    </section>
  )
}
