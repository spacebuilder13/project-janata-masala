import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function ExpandableCard({ title, subtitle, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
      <button
        type="button"
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="font-medium text-sm">{title}</p>
          {subtitle && <p className="text-xs mt-1" style={{ color: 'var(--color-sandy-ink-faint)' }}>{subtitle}</p>}
        </div>
        <span className="mono text-[10px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-4 text-sm overflow-hidden"
            style={{ color: 'var(--color-sandy-ink-soft)' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
