import { useState } from 'react'

type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function ExpandableCard({ title, subtitle, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="surface-card">
      <button
        type="button"
        className="surface-card-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="surface-card-heading min-w-0">
          <p className="surface-card-title">{title}</p>
          {subtitle && <p className="surface-card-sub">{subtitle}</p>}
        </div>
        <span className="mono-caps shrink-0" style={{ color: 'var(--color-sandy-ink-faint)' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="surface-card-body">
          {children}
        </div>
      )}
    </div>
  )
}
