import { motion } from 'framer-motion'
import { fadeRise } from '@/components/sandy/motion'
import ArchitectureDiagram from '@/components/explorations/ArchitectureDiagram'

export default function ExplorationsArchitecture() {
  return (
    <div className="px-6 py-12 md:px-12 max-w-5xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={fadeRise}>
        <p className="mono" style={{ color: 'var(--color-jm-spice)' }}>Explorations · Architecture</p>
        <h1 className="serif text-4xl mt-3">Agentic commerce for Janata Masala</h1>
        <p className="mt-4 text-sm max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Multiple specialized agents — voice intake, catalogue, inventory, orders, CRM, finance — orchestrated by Claude.
        </p>
        <div className="mt-10">
          <ArchitectureDiagram />
        </div>
      </motion.div>
    </div>
  )
}
