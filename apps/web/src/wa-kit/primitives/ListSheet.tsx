import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ease } from '@/components/sandy/motion'
import WAChrome from '../WAChrome'
import Bubble from '../Bubble'

export type ListSection = { title: string; rows: string[] }

type Props = {
  prompt: string
  triggerLabel: string
  sheetTitle: string
  sections: ListSection[]
  autoOpen?: boolean
  autoOpenDelay?: number
}

export default function ListSheet({
  prompt,
  triggerLabel,
  sheetTitle,
  sections,
  autoOpen = false,
  autoOpenDelay = 1200,
}: Props) {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)

  useEffect(() => {
    if (!autoOpen) return
    const t = setTimeout(() => setOpen(true), autoOpenDelay)
    return () => clearTimeout(t)
  }, [autoOpen, autoOpenDelay])

  return (
    <WAChrome>
      <Bubble>{prompt}</Bubble>
      <Bubble noPadding>
        <button type="button" className="wa-list-trigger" onClick={() => setOpen(true)}>
          ☰ {triggerLabel}
        </button>
        <div className="wa-bubble__meta wa-bubble__meta--inset">
          <span>9:41</span>
        </div>
      </Bubble>
      {picked && <Bubble side="out">{picked}</Bubble>}

      <AnimatePresence>
        {open && !picked && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.32, ease: ease.arrive }}
            className="wa-sheet"
          >
            <div className="wa-sheet__title">{sheetTitle}</div>
            <div className="wa-sheet__body">
              {sections.map((s) => (
                <div key={s.title}>
                  <div className="wa-sheet__section-label">{s.title}</div>
                  {s.rows.map((r) => (
                    <button
                      key={r}
                      type="button"
                      className="wa-sheet__row"
                      onClick={() => {
                        setPicked(r)
                        setOpen(false)
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WAChrome>
  )
}
