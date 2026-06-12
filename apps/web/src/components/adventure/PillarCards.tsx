import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import { pillars } from '@/data/strategy'
import SectionHead from '../sandy/SectionHead'

export default function PillarCards({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Strategic pillars" title="Three pillars of modernization" />
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {pillars.map((p) => (
          <motion.article
            key={p.id}
            variants={fadeRise}
            className="surface-card"
          >
            <span className="caption-label caption-label--spice">{p.tag}</span>
            <h3 className="serif text-xl mt-2">{p.title}</h3>
            <p className="caption-text mt-2">{p.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
