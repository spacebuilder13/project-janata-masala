import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/components/sandy/motion'

type Props = {
  side?: 'in' | 'out'
  children: ReactNode
  time?: string
  ticks?: 'sent' | 'delivered' | 'read' | null
  tail?: boolean
  tone?: string
  noPadding?: boolean
}

export default function Bubble({
  side = 'in',
  children,
  time = '9:41',
  ticks = 'read',
  tail = true,
  tone,
  noPadding,
}: Props) {
  const isOut = side === 'out'
  const bg = tone ?? (isOut ? 'var(--wa-accent, #D9FDD3)' : 'var(--wa-bubble-in, white)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: ease.arrive }}
      className={`flex ${isOut ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-[78%] ${noPadding ? '' : 'px-2.5 py-1.5'} text-[11.5px] leading-snug`}
        style={{
          background: bg,
          color: 'var(--wa-bubble-text)',
          borderRadius: 8,
          borderTopLeftRadius: !isOut && tail ? 2 : 8,
          borderTopRightRadius: isOut && tail ? 2 : 8,
          boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
        }}
      >
        {children}
        {!noPadding && (
          <div
            className="flex items-center justify-end gap-0.5 mt-0.5 text-[8.5px]"
            style={{ color: 'var(--wa-bubble-meta)' }}
          >
            <span>{time}</span>
            {isOut && ticks && (
              <span style={{ color: ticks === 'read' ? '#53BDEB' : 'var(--wa-bubble-meta)' }}>
                {ticks === 'sent' ? '✓' : '✓✓'}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
