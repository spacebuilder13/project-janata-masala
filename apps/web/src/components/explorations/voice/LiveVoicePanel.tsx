import { motion } from 'framer-motion'
import { fadeRise } from '@/components/sandy/motion'
import type { VoiceCallStatus } from '@/types/voice'

type Props = {
  status: VoiceCallStatus
  hint: string
  timer: string
  canStart: boolean
  canEnd: boolean
  onStart: () => void
  onEnd: () => void
  onReset?: () => void
}

function statusDotClass(status: VoiceCallStatus) {
  if (status === 'live') return 'voice-status-dot voice-status-dot--live'
  if (status === 'done') return 'voice-status-dot voice-status-dot--done'
  if (status === 'connecting' || status === 'extracting') return 'voice-status-dot voice-status-dot--busy'
  return 'voice-status-dot'
}

function statusLabel(status: VoiceCallStatus) {
  if (status === 'checking') return 'Checking…'
  return status.replace('_', ' ')
}

export default function LiveVoicePanel({
  status,
  hint,
  timer,
  canStart,
  canEnd,
  onStart,
  onEnd,
  onReset,
}: Props) {
  const isLive = status === 'live'
  const isBusy = status === 'connecting' || status === 'extracting'
  const isDone = status === 'done' || status === 'error'
  const showEndCall = canEnd && !isDone

  return (
    <motion.div variants={fadeRise} initial="hidden" animate="show" className="voice-card">
      <p className="voice-card__eyebrow">VoiceAgent · Priya · Live</p>
      <p className="voice-card__lead">
        Speak your spice list like at a Mumbai kirana counter. Priya confirms quantities — Claude
        extracts the order below.
      </p>

      <div className="voice-status-row" style={{ marginTop: 20 }}>
        <span className={statusDotClass(status)} aria-hidden="true" />
        <span className="voice-status-label">{statusLabel(status)}</span>
        {isLive && <span className="voice-status-timer">{timer}</span>}
      </div>

      <div className={`voice-actions${showEndCall ? '' : ' voice-actions--single'}`}>
        <button
          type="button"
          disabled={!canStart || isBusy}
          onClick={() => {
            if (isDone || status === 'extracting') onReset?.()
            if (status !== 'extracting') onStart()
          }}
          className={`voice-btn ${isDone ? 'voice-btn--secondary' : 'voice-btn--primary'}`}
        >
          {isDone ? 'New order' : status === 'extracting' ? 'Cancel' : 'Start order'}
        </button>
        {showEndCall && (
          <button
            type="button"
            disabled={!canEnd}
            onClick={onEnd}
            className="voice-btn voice-btn--secondary"
          >
            End call
          </button>
        )}
      </div>

      <p className="voice-hint">{hint}</p>
    </motion.div>
  )
}
