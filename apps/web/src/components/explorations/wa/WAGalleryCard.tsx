import { useState } from 'react'
import type { WAPattern } from '@/data/whatsapp'
import { JM_WA_COMPONENTS } from './demos'

type Props = {
  pattern: WAPattern
}

export default function WAGalleryCard({ pattern }: Props) {
  const Demo = JM_WA_COMPONENTS[pattern.id]
  const [key, setKey] = useState(0)

  if (!Demo) return null

  return (
    <article className="wa-gallery-card">
      <div className="wa-gallery-card__stage">
        <div className="wa-mini-frame relative">
          <Demo key={key} />
        </div>
        <button
          type="button"
          onClick={() => setKey((v) => v + 1)}
          className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border-0 cursor-pointer"
          style={{
            background: 'color-mix(in oklab, var(--color-sandy-ink) 80%, transparent)',
            color: 'var(--color-sandy-bg)',
            fontFamily: 'var(--font-sandy-mono)',
          }}
        >
          Restart
        </button>
        <div
          className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{
            background: 'var(--color-sandy-bg)',
            color: 'var(--color-sandy-ink-faint)',
            fontFamily: 'var(--font-sandy-mono)',
            border: '1px solid var(--color-sandy-line)',
          }}
        >
          WA · {pattern.number}
        </div>
      </div>

      <div className="wa-gallery-card__body">
        <h3 className="wa-gallery-card__title">{pattern.title}</h3>
        <p className="wa-gallery-card__intent">{pattern.intent}</p>

        <div className="mt-3">
          <span
            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full inline-block"
            style={{
              fontFamily: 'var(--font-sandy-mono)',
              background: 'var(--color-sandy-elevated)',
              color: 'var(--color-sandy-ink-soft)',
            }}
          >
            API · {pattern.api}
          </span>
        </div>

        <div className="wa-gallery-card__research">
          <div className="wa-gallery-card__research-label">Why it elevates</div>
          <p className="wa-gallery-card__research-text">{pattern.research}</p>
        </div>
      </div>
    </article>
  )
}
