import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import { benchmarks, stackSummary } from '@/data/benchmarks'

const layerColors = {
  brand: 'var(--color-sandy-gold)',
  channel: 'var(--color-jm-spice)',
  tech: 'var(--color-sandy-tea)',
}

export default function BenchmarkStack() {
  return (
    <section>
      <SectionHead eyebrow="Benchmarks" title="The benchmark stack" blurb={stackSummary} />
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {benchmarks.map((b) => (
          <motion.article
            key={b.id}
            variants={fadeRise}
            className="p-6 rounded-2xl border"
            style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
          >
            <span className="mono text-[10px]" style={{ color: layerColors[b.stackLayer] }}>{b.stackLayer} · {b.jmPhase}</span>
            <h3 className="serif text-xl mt-2">{b.name}</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-sandy-ink-faint)' }}>{b.subtitle}</p>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{b.lesson}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
