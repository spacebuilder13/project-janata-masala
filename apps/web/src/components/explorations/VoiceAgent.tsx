import { motion } from 'framer-motion'
import { fadeRise } from '../sandy/motion'
import SystemFlowDiagram from './SystemFlowDiagram'
import LiveVoicePanel from './voice/LiveVoicePanel'
import OrderBillCard from './voice/OrderBillCard'
import ForDevinPanel from './voice/ForDevinPanel'
import { useLiveVoice } from '@/hooks/useLiveVoice'

export default function VoiceAgent() {
  const {
    status,
    hint,
    timer,
    structured,
    devin,
    startCall,
    endCall,
    reset,
    canStart,
    canEnd,
    liveEnabled,
  } = useLiveVoice()

  const handleStart = () => {
    startCall().catch((e) => console.error('startCall', e))
  }

  const handleEnd = () => {
    endCall().catch((e) => console.error('endCall', e))
  }

  return (
    <div className="space-y-8">
      <motion.div
        variants={fadeRise}
        initial="hidden"
        animate="show"
        className="p-6 rounded-2xl border"
        style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}
      >
        <p className="mono text-[11px]" style={{ color: 'var(--color-jm-spice)' }}>
          VoiceAgent · Live
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Speak your spice list like you would at a Mumbai kirana counter. Priya confirms quantities,
          then Claude extracts structured output — Inventory, Orders, CRM, and Finance update below.
        </p>
        {!liveEnabled && (
          <p className="mt-2 text-xs" style={{ color: 'var(--color-sandy-ink-faint)' }}>
            Set VITE_ENABLE_LIVE_VOICE=true and configure ElevenLabs + Anthropic keys on Vercel.
          </p>
        )}
      </motion.div>

      <LiveVoicePanel
        status={status}
        hint={hint}
        timer={timer}
        canStart={canStart}
        canEnd={canEnd}
        onStart={handleStart}
        onEnd={handleEnd}
        onReset={reset}
      />

      {structured && (
        <>
          <OrderBillCard structured={structured} />
          <SystemFlowDiagram structured={structured} />
        </>
      )}

      {devin && <ForDevinPanel devin={devin} />}
    </div>
  )
}
