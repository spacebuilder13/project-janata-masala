import { motion } from 'framer-motion'
import { fadeRise } from './motion'

type Phase = { label: string; tag: string; active?: boolean }

type Props = {
  phases: Phase[]
  animateActive?: boolean
}

export default function DiagramFlow({ phases, animateActive = false }: Props) {
  return (
    <div className="flex flex-col gap-0">
      {phases.map((p, i) => (
        <motion.div
          key={p.label}
          className="flex flex-col items-start"
          variants={fadeRise}
          initial="hidden"
          animate="show"
          transition={{ delay: i * 0.15 }}
        >
          <div
            className="flex flex-col gap-1 px-5 py-4 rounded-2xl border min-w-[280px] transition-all duration-500"
            style={{
              borderColor: p.active ? 'var(--color-jm-spice)' : 'var(--color-sandy-line)',
              background: p.active ? 'var(--color-sandy-gold-wash)' : 'var(--color-sandy-surface)',
              boxShadow: p.active ? '0 0 20px rgba(196,90,26,0.15)' : '0 2px 12px -6px rgba(27,26,23,0.1)',
              animation: p.active && animateActive ? 'pulse-glow 2s ease-in-out infinite' : undefined,
            }}
          >
            <span className="text-[15px] font-medium" style={{ color: 'var(--color-sandy-ink)' }}>{p.label}</span>
            <span className="mono text-[9.5px] lowercase" style={{ color: 'var(--color-sandy-ink-faint)' }}>{p.tag}</span>
          </div>
          {i < phases.length - 1 && (
            <div className="w-6 h-7 ml-5 flex-shrink-0" style={{ color: 'var(--color-sandy-line-strong)' }} aria-hidden="true">
              <svg viewBox="0 0 24 28" fill="none" className="w-full h-full">
                <line x1="12" y1="0" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 12 L12 20 L17 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
