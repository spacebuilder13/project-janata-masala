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
    <article className="wa-gallery-card" data-wa-pattern={pattern.id}>
      <div className="wa-gallery-card__stage">
        <div className="wa-mini-frame">
          <Demo key={key} />
        </div>
        <button type="button" className="wa-gallery-card__restart" onClick={() => setKey((v) => v + 1)}>
          Restart
        </button>
        <div className="wa-gallery-card__badge">WA · {pattern.number}</div>
      </div>

      <div className="wa-gallery-card__body">
        <h3 className="wa-gallery-card__title">{pattern.title}</h3>
        <p className="wa-gallery-card__intent">{pattern.intent}</p>

        <div className="mt-3">
          <span className="wa-gallery-card__api">API · {pattern.api}</span>
        </div>

        <div className="wa-gallery-card__research">
          <div className="wa-gallery-card__research-label">Why it elevates</div>
          <p className="wa-gallery-card__research-text">{pattern.research}</p>
        </div>
      </div>
    </article>
  )
}
