import WAChrome from '../WAChrome'
import Bubble, { BubbleMeta } from '../Bubble'

type Props = {
  intro: string
  orderLabel: string
  lines: string
  total: string
  ctaLabel: string
}

export default function CtaUrlButton({ intro, orderLabel, lines, total, ctaLabel }: Props) {
  return (
    <WAChrome>
      <Bubble>{intro}</Bubble>
      <Bubble noPadding>
        <div className="wa-bill-block">
          <div className="wa-bubble__label">{orderLabel}</div>
          <div className="mt-1">{lines}</div>
          <div className="wa-bill-total">{total}</div>
        </div>
        <button type="button" className="wa-action-btn">
          ↗ {ctaLabel}
        </button>
        <BubbleMeta />
      </Bubble>
    </WAChrome>
  )
}
