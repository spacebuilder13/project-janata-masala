import { motion } from 'framer-motion'
import { fadeRise } from './motion'

type Props = {
  nodes: string[]
  centerText?: string
  activeIndex?: number
}

export default function DiagramLoop({ nodes, centerText, activeIndex = -1 }: Props) {
  return (
    <div className="flex items-start gap-12">
      <div className="flex flex-col items-center gap-0 relative">
        {nodes.map((node, i) => (
          <motion.div
            key={node}
            className="flex flex-col items-center"
            variants={fadeRise}
            initial="hidden"
            animate="show"
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="px-7 py-3.5 rounded-2xl border text-center min-w-[260px] transition-all duration-500"
              style={{
                borderColor: i === activeIndex ? 'var(--color-jm-spice)' : 'var(--color-sandy-line)',
                background: i === activeIndex ? 'var(--color-sandy-gold-wash)' : 'var(--color-sandy-surface)',
                boxShadow: i === activeIndex ? '0 0 16px rgba(196,90,26,0.2)' : '0 2px 8px -4px rgba(27,26,23,0.08)',
              }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--color-sandy-ink-soft)' }}>{node}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="w-6 h-8" style={{ color: 'var(--color-sandy-line-strong)' }} aria-hidden="true">
                <svg viewBox="0 0 24 32" fill="none" className="w-full h-full">
                  <line x1="12" y1="0" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 17 L12 26 L16 17" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {centerText && (
        <p className="serif text-lg max-w-xs mt-4" style={{ color: 'var(--color-sandy-ink-soft)' }}>{centerText}</p>
      )}
    </div>
  )
}
