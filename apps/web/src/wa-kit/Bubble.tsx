import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/components/sandy/motion'

type Props = {
  side?: 'in' | 'out'
  children: ReactNode
  time?: string
  ticks?: 'sent' | 'delivered' | 'read' | null
  wide?: boolean
  noPadding?: boolean
  transparent?: boolean
}

export default function Bubble({
  side = 'in',
  children,
  time = '9:41',
  ticks = 'read',
  wide,
  noPadding,
  transparent,
}: Props) {
  const rowClass = side === 'out' ? 'wa-bubble-row wa-bubble-row--out' : 'wa-bubble-row'
  const bubbleClass = [
    'wa-bubble',
    wide && 'wa-bubble--wide',
    noPadding && 'wa-bubble--no-pad',
    transparent && 'wa-bubble--transparent',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: ease.arrive }}
      className={rowClass}
    >
      <div className={bubbleClass}>
        {children}
        {!noPadding && (
          <div className="wa-bubble__meta">
            <span>{time}</span>
            {side === 'out' && ticks && (
              <span className={ticks === 'read' ? 'wa-bubble__meta--read' : undefined}>
                {ticks === 'sent' ? '✓' : '✓✓'}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function BubbleMeta({ time = '9:41', ticks }: { time?: string; ticks?: boolean }) {
  return (
    <div className="wa-bubble__meta">
      <span>{time}</span>
      {ticks && <span className="wa-bubble__meta--read">✓✓</span>}
    </div>
  )
}
