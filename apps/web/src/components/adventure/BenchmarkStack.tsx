import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import { benchmarks, stackSummary } from '@/data/benchmarks'

const layerColors = {
  brand: 'var(--color-sandy-gold)',
  channel: 'var(--color-jm-spice)',
  tech: 'var(--color-sandy-tea)',
}

export default function BenchmarkStack({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Benchmarks" title="The benchmark stack" blurb={stackSummary} />
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
            className="surface-card surface-card-inner"
          >
            <span className="caption-label" style={{ color: layerColors[b.stackLayer] }}>{b.stackLayer} · {b.jmPhase}</span>
            <h3 className="serif text-xl">{b.name}</h3>
            <p className="surface-card-sub">{b.subtitle}</p>
            <p className="list-row-text">{b.lesson}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
