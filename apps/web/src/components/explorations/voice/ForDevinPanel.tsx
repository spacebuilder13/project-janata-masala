import { Fragment } from 'react'
import type { DevinPayload } from '@/types/voice'

type Props = { devin: DevinPayload }

export default function ForDevinPanel({ devin }: Props) {
  const el = devin.usage.elevenlabs?.credits_used ?? 0
  const cin = devin.usage.claude?.input_tokens ?? 0
  const cout = devin.usage.claude?.output_tokens ?? 0
  const inr = devin.usage.estimated_cost_inr ?? 0
  const usd = devin.usage.estimated_cost_usd ?? 0

  const metaRows: [string, string][] = [
    ['Session', devin.sessionId],
    ['Conversation', devin.conversationId || '—'],
    ['Agent', String(devin.meta.agent_id ?? '—')],
    ['Prompt', String(devin.meta.prompt_version ?? '—')],
    [
      'EL balance',
      `${devin.balance?.character_remaining?.toLocaleString() ?? '—'} remaining (${devin.balance?.pct_remaining ?? '—'}%)`,
    ],
    ['EL session', `${el} credits · ${devin.usage.elevenlabs?.duration_secs ?? 0}s`],
    ['Claude', `${cin} in / ${cout} out · $${usd.toFixed(4)} (~₹${inr})`],
    [
      'Validation',
      devin.validation.ok ? 'ok' : devin.validation.errors.join(', '),
    ],
  ]

  return (
    <details className="voice-devin">
      <summary>
        For Devin — EL {el} cr · Claude {cin}/{cout} · ~₹{inr.toFixed(2)}
      </summary>
      <div className="voice-devin__body">
        <dl className="voice-meta-grid">
          {metaRows.map(([label, value]) => (
            <Fragment key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>

        <div className="voice-code-block">
          <p className="caption-label voice-code-block__label">Transcript</p>
          <pre>{devin.transcript || '(empty)'}</pre>
        </div>

        <div className="voice-code-block">
          <p className="caption-label voice-code-block__label">Structured JSON</p>
          <pre className="voice-pre--tall">
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
