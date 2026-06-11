import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import { pillars } from '@/data/strategy'
import SectionHead from '../sandy/SectionHead'

export default function PillarCards() {
  return (
    <section>
      <SectionHead eyebrow="Strategic pillars" title="Three pillars of modernization" />
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
            className="p-6 rounded-2xl border"
            style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
          >
            <span className="mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>{p.tag}</span>
            <h3 className="serif text-xl mt-2">{p.title}</h3>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{p.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
