import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise } from '../sandy/motion'
import SystemFlowDiagram from './SystemFlowDiagram'
import ConversationSimulator from './ConversationSimulator'
import { voiceScenarios } from '@/data/voice-scripts'
import type { VoiceScenario } from '@/data/voice-scripts'

type StructuredOutput = VoiceScenario['structured']

export default function VoiceAgent() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [structured, setStructured] = useState<StructuredOutput | null>(null)

  return (
    <div className="space-y-8">
      <motion.div variants={fadeRise} initial="hidden" animate="show" className="p-6 rounded-2xl border" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
        <p className="mono text-[11px]" style={{ color: 'var(--color-jm-spice)' }}>VoiceAgent · Offline simulator</p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Scripted conversations demonstrate order-taking. Structured JSON updates Inventory, Orders, CRM, and Finance — no API keys required.
        </p>
        <p className="mt-2 text-xs" style={{ color: 'var(--color-sandy-ink-faint)' }}>Live ElevenLabs voice — coming soon when agent is configured.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {voiceScenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="px-4 py-2 rounded-xl mono text-[11px] border"
              style={{
                background: activeScenario === i ? 'var(--color-sandy-ink)' : 'transparent',
                color: activeScenario === i ? 'var(--color-sandy-bg)' : 'var(--color-sandy-ink-soft)',
                borderColor: 'var(--color-sandy-line)',
              }}
              onClick={() => { setActiveScenario(i); setStructured(null) }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </motion.div>

      <ConversationSimulator
        key={voiceScenarios[activeScenario].id}
        scenario={voiceScenarios[activeScenario]}
        onComplete={(s) => setStructured(s)}
      />

      {structured && (
        <>
          <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl border text-xs overflow-x-auto mono" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}>
            {JSON.stringify(structured, null, 2)}
          </motion.pre>
          <SystemFlowDiagram structured={structured} />
        </>
      )}
    </div>
  )
}
