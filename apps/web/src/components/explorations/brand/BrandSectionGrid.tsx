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
            className="p-6 rounded-2xl border min-h-[140px]"
            style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
          >
            <span className="mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>{item.tag}</span>
            <h3 className="serif text-lg mt-2">{item.title}</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{item.description}</p>
            <div className="mt-4 h-16 rounded-xl border border-dashed flex items-center justify-center text-xs" style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-sandy-ink-faint)' }}>
              Visual placeholder
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
