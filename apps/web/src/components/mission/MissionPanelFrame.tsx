import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  blurb?: string
  children: ReactNode
}

export default function MissionPanelFrame({ eyebrow, title, blurb, children }: Props) {
  return (
    <div className="mc-panel-frame">
      <header className="mc-panel-frame-head">
        <p className="caption-label caption-label--spice">{eyebrow}</p>
        <h2 className="mc-panel-frame-title serif">{title}</h2>
        {blurb && <p className="mc-panel-frame-blurb caption-text">{blurb}</p>}
      </header>
      <div className="mc-panel-frame-body">{children}</div>
    </div>
  )
}
