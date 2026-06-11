import { motion } from 'framer-motion'
import { fadeRise } from '@/components/sandy/motion'
import HeritageFrame from '@/components/explorations/brand/HeritageFrame'
import BrandSectionGrid from '@/components/explorations/brand/BrandSectionGrid'

export default function ExplorationsBrand() {
  return (
    <div className="px-6 py-12 md:px-12 max-w-5xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={fadeRise}>
        <p className="mono" style={{ color: 'var(--color-jm-spice)' }}>Explorations · Brand</p>
        <h1 className="serif text-4xl mt-3">Brand & content direction</h1>
        <p className="mt-4 text-sm max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Heritage authority, workshop content system, sensory storytelling, and performance marketing for Ghatkopar.
        </p>
        <div className="mt-10"><HeritageFrame /></div>
        <div className="mt-16"><BrandSectionGrid /></div>
      </motion.div>
    </div>
  )
}
