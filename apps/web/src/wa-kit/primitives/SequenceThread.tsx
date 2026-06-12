import { useEffect, useState, type ReactNode } from 'react'
import WAChrome from '../WAChrome'
import Bubble from '../Bubble'

type Step = { side?: 'in' | 'out'; content: ReactNode; noPadding?: boolean; wide?: boolean }

type Props = {
  steps: Step[]
  delays?: number[]
}

export default function SequenceThread({ steps, delays }: Props) {
  const [visible, setVisible] = useState(1)

  useEffect(() => {
    if (!delays?.length) return
    const timers = delays.map((ms, idx) =>
      setTimeout(() => setVisible(idx + 2), ms)
    )
    return () => timers.forEach(clearTimeout)
  }, [delays])

  const shown = delays ? steps.slice(0, visible) : steps

  return (
    <WAChrome>
      {shown.map((step, idx) =>
        step.noPadding ? (
          <Bubble key={idx} side={step.side} wide={step.wide} noPadding>
            {step.content}
          </Bubble>
        ) : (
          <Bubble key={idx} side={step.side} wide={step.wide}>
            {step.content}
          </Bubble>
        )
      )}
    </WAChrome>
  )
}

export function PayNowBlock({ total, orderId, cta = 'Pay now' }: { total: string; orderId: string; cta?: string }) {
  return (
    <>
      <div className="wa-bill-block">
        <strong>{total}</strong>
        <br />
        <span className="wa-bubble__sub">{orderId}</span>
      </div>
      <button type="button" className="wa-action-btn">
        ↗ {cta}
      </button>
      <div className="wa-bubble__meta" style={{ padding: '0 10px 4px' }}>
        <span>9:42</span>
      </div>
    </>
  )
}
