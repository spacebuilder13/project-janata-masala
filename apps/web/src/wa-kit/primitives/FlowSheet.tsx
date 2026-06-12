import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ease } from '@/components/sandy/motion'
import WAChrome from '../WAChrome'
import Bubble from '../Bubble'

type Props = {
  prompt: string
  triggerLabel: string
  sheetTitle: string
  questions: { label: string; options: string[] }[]
  doneMessage: string
  autoOpen?: boolean
  autoOpenDelay?: number
}

export default function FlowSheet({
  prompt,
  triggerLabel,
  sheetTitle,
  questions,
  doneMessage,
  autoOpen = false,
  autoOpenDelay = 1000,
}: Props) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!autoOpen) return
    const t = setTimeout(() => setOpen(true), autoOpenDelay)
    return () => clearTimeout(t)
  }, [autoOpen, autoOpenDelay])

  return (
    <WAChrome>
      <Bubble>{prompt}</Bubble>
      <Bubble noPadding>
        <button
          type="button"
          className="wa-list-trigger"
          onClick={() => {
            setOpen(true)
            setDone(false)
          }}
        >
          ⚙ {triggerLabel}
        </button>
        <div className="wa-bubble__meta" style={{ padding: '0 10px 4px' }}>
          <span>9:41</span>
        </div>
      </Bubble>
      {done && <Bubble>{doneMessage}</Bubble>}

      <AnimatePresence>
        {open && !done && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.34, ease: ease.arrive }}
            className="wa-sheet wa-sheet--full"
          >
            <div className="wa-sheet__header">
              <button type="button" className="wa-sheet__close" onClick={() => setOpen(false)}>
                ✕
              </button>
              <div className="wa-sheet__heading">{sheetTitle}</div>
            </div>
            <div className="wa-sheet__content">
              {questions.map((q) => (
                <div key={q.label}>
                  <div className="wa-sheet__question">{q.label}</div>
                  {q.options.map((o) => (
                    <button key={o} type="button" className="wa-sheet__option">
                      {o}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="wa-sheet__footer">
              <button
                type="button"
                className="wa-sheet__submit"
                onClick={() => {
                  setOpen(false)
                  setDone(true)
                }}
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WAChrome>
  )
}
