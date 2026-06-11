import { motion } from 'framer-motion'
import { fadeRise } from '../../sandy/motion'
import { heritageFrame } from '@/data/brand-mockups'

export default function HeritageFrame() {
  return (
    <motion.div variants={fadeRise} className="p-8 rounded-3xl border" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-gold-wash)' }}>
      <p className="mono text-[11px]" style={{ color: 'var(--color-jm-spice)' }}>Heritage framing</p>
      <h2 className="serif text-3xl mt-3">{heritageFrame.headline}</h2>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-sandy-ink-soft)' }}>{heritageFrame.body}</p>
    </motion.div>
  )
}
