import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VoiceScenario } from '@/data/voice-scripts'

type Props = {
  scenario: VoiceScenario
  onComplete: (structured: VoiceScenario['structured']) => void
}

export default function ConversationSimulator({ scenario, onComplete }: Props) {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= scenario.messages.length - 1) return
    setTyping(true)
    const nextIdx = step + 1
    const t = setTimeout(() => {
      setTyping(false)
      setStep(nextIdx)
    }, scenario.messages[nextIdx]?.role === 'agent' ? 1200 : 800)
    return () => clearTimeout(t)
  }, [playing, step, scenario.messages])

  useEffect(() => {
    if (step === scenario.messages.length - 1 && playing && !typing) {
      const t = setTimeout(() => onComplete(scenario.structured), 800)
      return () => clearTimeout(t)
    }
  }, [step, playing, typing, scenario, onComplete])

  const start = () => { setStep(-1); setPlaying(true) }
  const reset = () => { setStep(-1); setPlaying(false); setTyping(false) }

  const visible = scenario.messages.slice(0, step + 1)

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
      <div className="px-4 py-3 border-b flex justify-between items-center" style={{ borderColor: 'var(--color-sandy-line)' }}>
        <div>
          <p className="caption-label caption-label--spice">Conversation simulator</p>
          <p className="text-sm font-medium">{scenario.title}</p>
          <p className="text-xs" style={{ color: 'var(--color-sandy-ink-faint)' }}>{scenario.subtitle}</p>
        </div>
        <div className="flex gap-2">
          {!playing ? (
            <button type="button" className="tag tag--active" onClick={start}>Play →</button>
          ) : (
            <button type="button" className="tag" onClick={reset}>Reset</button>
          )}
        </div>
      </div>
      <div className="p-4 space-y-3 min-h-[200px] max-h-[320px] overflow-y-auto">
        <AnimatePresence>
          {visible.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm px-4 py-2.5 rounded-2xl max-w-[85%] ${m.role === 'customer' ? 'ml-auto' : ''}`}
              style={{
                background: m.role === 'customer' ? 'var(--color-sandy-ink)' : 'var(--color-sandy-elevated)',
                color: m.role === 'customer' ? 'var(--color-sandy-bg)' : 'var(--color-sandy-ink-soft)',
              }}
            >
              <span className="caption-label block mb-1 opacity-60">{m.role}</span>
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <p className="caption-label" style={{ color: 'var(--color-sandy-ink-faint)' }}>Agent typing…</p>
        )}
      </div>
    </div>
  )
}
