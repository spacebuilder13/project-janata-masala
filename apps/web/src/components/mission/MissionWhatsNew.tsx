import { useState } from 'react'
import { whatsNewBullets } from '@/data/mission-center'

const STORAGE_KEY = 'jm-mission-v2-seen'

export default function MissionWhatsNew() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== '1'
    } catch {
      return true
    }
  })

  if (!visible) return null

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <div className="mc-whats-new">
      <div className="mc-whats-new-body">
        <p className="caption-label caption-label--spice">What&apos;s new in v2</p>
        <ul className="mc-whats-new-list">
          {whatsNewBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <button type="button" className="mc-whats-new-dismiss" onClick={dismiss}>
        Got it
      </button>
    </div>
  )
}
