import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import { stores, hyperLocal } from '@/data/commerce-101-brief'

export default function StoreContextCards({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Locations" title="Two stores, one hyperlocal strategy" />
      <div className="adv-hyperlocal-banner surface-card mb-6">
        <p className="caption-label caption-label--gold">Hyper-local focus</p>
        <p className="caption-text mt-2">
          <strong>{hyperLocal.demographic}</strong> within <strong>{hyperLocal.radius}</strong> of each store.
        </p>
        <p className="caption-text mt-2" style={{ color: 'var(--color-sandy-ink-faint)' }}>
          {hyperLocal.philosophy}
        </p>
      </div>
      <motion.div
        className="grid md:grid-cols-2 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {stores.map((store) => (
          <motion.article key={store.id} variants={fadeRise} className="surface-card">
            <span className="caption-label caption-label--spice">{store.tag}</span>
            <h3 className="serif text-2xl mt-2">{store.name}</h3>
            <p className="caption-text mt-3">{store.description}</p>
            <p className="caption-text mt-3" style={{ color: 'var(--color-sandy-ink-faint)' }}>
              {store.footnote}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
