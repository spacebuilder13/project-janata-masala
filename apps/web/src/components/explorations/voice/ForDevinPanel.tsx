import type { DevinPayload } from '@/types/voice'

type Props = { devin: DevinPayload }

export default function ForDevinPanel({ devin }: Props) {
  const el = devin.usage.elevenlabs?.credits_used ?? 0
  const cin = devin.usage.claude?.input_tokens ?? 0
  const cout = devin.usage.claude?.output_tokens ?? 0
  const inr = devin.usage.estimated_cost_inr ?? 0
  const usd = devin.usage.estimated_cost_usd ?? 0

  return (
    <details
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}
    >
      <summary
        className="px-6 py-4 cursor-pointer select-none mono text-[11px] font-semibold"
        style={{ color: 'var(--color-jm-spice)' }}
      >
        For Devin — EL {el} cr · Claude {cin}/{cout} · ~₹{inr}
      </summary>
      <div className="px-6 pb-6 space-y-4 border-t" style={{ borderColor: 'var(--color-sandy-line)' }}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-4" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          <span className="font-semibold">Session</span>
          <span className="mono">{devin.sessionId}</span>
          <span className="font-semibold">Conversation</span>
          <span className="mono break-all">{devin.conversationId || '—'}</span>
          <span className="font-semibold">Agent</span>
          <span className="mono break-all">{String(devin.meta.agent_id ?? '—')}</span>
          <span className="font-semibold">Prompt</span>
          <span className="mono">{String(devin.meta.prompt_version ?? '—')}</span>
          <span className="font-semibold">EL balance</span>
          <span>
            {devin.balance?.character_remaining?.toLocaleString() ?? '—'} remaining (
            {devin.balance?.pct_remaining ?? '—'}%)
          </span>
          <span className="font-semibold">EL session</span>
          <span>
            {el} credits · {devin.usage.elevenlabs?.duration_secs ?? 0}s
          </span>
          <span className="font-semibold">Claude</span>
          <span>
            {cin} in / {cout} out · ${usd.toFixed(4)}
          </span>
          <span className="font-semibold">Validation</span>
          <span style={{ color: devin.validation.ok ? 'var(--color-sandy-ink)' : '#b42318' }}>
            {devin.validation.ok ? 'ok' : devin.validation.errors.join(', ')}
          </span>
        </div>

        <div>
          <p className="caption-label mb-2">Transcript</p>
          <pre
            className="p-3 rounded-xl text-[11px] overflow-x-auto mono max-h-40"
            style={{ background: 'var(--color-sandy-elevated)', color: 'var(--color-sandy-ink-soft)' }}
          >
            {devin.transcript || '(empty)'}
          </pre>
        </div>

        <div>
          <p className="caption-label mb-2">Structured JSON</p>
          <pre
            className="p-3 rounded-xl text-[11px] overflow-x-auto mono max-h-60"
            style={{ background: 'var(--color-sandy-elevated)', color: 'var(--color-sandy-ink-soft)' }}
          >
            {JSON.stringify(
              { structured: devin.structured, validation: devin.validation, meta: devin.meta },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </details>
  )
}
