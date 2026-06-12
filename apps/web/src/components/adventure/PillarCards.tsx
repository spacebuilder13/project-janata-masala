import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import { roadmapPhases, segmentMeta } from '@/data/commerce-roadmap'
import SectionHead from '../sandy/SectionHead'

const crawlSegments = roadmapPhases[0].segments ?? []

export default function PillarCards({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Operational pillars" title="Commerce 101 — three pillars" />
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {crawlSegments.map((p) => (
          <motion.article
            key={p.id}
            variants={fadeRise}
            className="surface-card"
            style={{ borderTop: `3px solid var(${segmentMeta[p.id].colorVar})` }}
          >
            <span className="caption-label caption-label--spice">{segmentMeta[p.id].label}</span>
            <h3 className="serif text-xl mt-2">{p.title}</h3>
            <p className="caption-text mt-2">{p.intro}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
