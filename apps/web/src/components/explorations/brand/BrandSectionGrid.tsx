import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../../sandy/motion'
import SectionHead from '../../sandy/SectionHead'
import { brandItems } from '@/data/brand-mockups'

export default function BrandSectionGrid() {
  return (
    <section>
      <SectionHead eyebrow="Creative direction" title="Brand & content system" blurb="Phase 1 creative deliverables from discovery sessions." />
      <motion.div
        className="grid sm:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.06) } }}
      >
        {brandItems.map((item) => (
          <motion.article
            key={item.id}
            variants={fadeRise}
            className="surface-card"
          >
            <span className="caption-label caption-label--spice">{item.tag}</span>
            <h3 className="serif text-lg mt-2">{item.title}</h3>
            <p className="caption-text mt-2">{item.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
