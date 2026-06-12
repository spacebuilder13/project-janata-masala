import type { ReactNode } from 'react'
import AnchorNav from './AnchorNav'

type Section = { id: string; label: string }
type Variant = 'hub' | 'scroll' | 'wide'

type Props = {
  variant?: Variant
  children: ReactNode
  anchorSections?: Section[]
}

export default function PageShell({ variant = 'scroll', children, anchorSections }: Props) {
  const pageCls = ['jm-page', variant === 'wide' ? 'jm-main--wide' : ''].filter(Boolean).join(' ')
  return (
    <div className={pageCls}>
      {anchorSections && anchorSections.length > 0 && <AnchorNav sections={anchorSections} />}
      <div className="jm-main">{children}</div>
    </div>
  )
}
