import { motion } from 'framer-motion'
import LivingLines from '../sandy/LivingLines'
import { fadeRise } from '../sandy/motion'
import { northStar } from '@/data/strategy'

export default function NorthStarBanner() {
  return (
    <motion.div
      variants={fadeRise}
      className="p-8 md:p-10 rounded-3xl border relative overflow-hidden"
      style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-gold-wash)' }}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <LivingLines />
      </div>
      <div className="relative">
        <p className="mono text-[11px]" style={{ color: 'var(--color-jm-spice)' }}>North star</p>
        <h2 className="serif text-2xl md:text-3xl mt-3">{northStar.question}</h2>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-sandy-ink-soft)' }}>{northStar.thesis}</p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-faint)' }}>{northStar.context}</p>
      </div>
    </motion.div>
  )
}
