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

  return (
    <motion.div
      variants={fadeRise}
      initial="hidden"
      animate="show"
      className="p-6 rounded-2xl border"
      style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{
            background: isLive ? 'var(--color-jm-spice)' : 'var(--color-sandy-ink-faint)',
            animation: isLive ? 'pulse 1.2s ease infinite' : undefined,
          }}
        />
        <span className="text-sm capitalize" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          {status === 'checking' ? 'Checking…' : status.replace('_', ' ')}
        </span>
        {(isLive || isBusy) && (
          <span className="ml-auto mono text-xs" style={{ color: 'var(--color-sandy-ink-faint)' }}>
            {timer}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!canStart || isBusy}
          onClick={() => {
            if (status === 'done' || status === 'error') onReset?.()
            onStart()
          }}
          className="flex-1 min-w-[140px] px-5 py-3 rounded-xl text-sm font-semibold disabled:opacity-40"
          style={{
            background: 'var(--color-sandy-ink)',
            color: 'var(--color-sandy-bg)',
          }}
        >
          {status === 'done' || status === 'error' ? 'New order' : 'Start order'}
        </button>
        <button
          type="button"
          disabled={!canEnd}
          onClick={onEnd}
          className="px-5 py-3 rounded-xl text-sm font-semibold border disabled:opacity-40"
          style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-sandy-ink-soft)' }}
        >
          End call
        </button>
      </div>

      <p className="mt-4 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
        {hint}
      </p>
    </motion.div>
  )
}
