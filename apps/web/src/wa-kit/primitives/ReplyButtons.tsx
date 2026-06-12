import { useEffect, useState } from 'react'
import WAChrome from '../WAChrome'
import Bubble from '../Bubble'

type Props = {
  prompt: string
  buttons: string[]
  followup: string
  chooseLabel?: string
}

export default function ReplyButtons({ prompt, buttons, followup, chooseLabel = 'Choose:' }: Props) {
  const [picked, setPicked] = useState<string | null>(null)
  const [showFollowup, setShowFollowup] = useState(false)

  useEffect(() => {
    if (!picked) return
    const t = setTimeout(() => setShowFollowup(true), 700)
    return () => clearTimeout(t)
  }, [picked])

  return (
    <WAChrome>
      <Bubble>{prompt}</Bubble>
      {!picked && (
        <Bubble noPadding>
          <div className="wa-reply-prompt">{chooseLabel}</div>
          <div className="wa-reply-row">
            {buttons.map((b) => (
              <button key={b} type="button" className="wa-reply-btn" onClick={() => setPicked(b)}>
                {b}
              </button>
            ))}
          </div>
          <div className="wa-bubble__meta" style={{ padding: '0 10px 4px' }}>
            <span>9:41</span>
          </div>
        </Bubble>
      )}
      {picked && <Bubble side="out">{picked}</Bubble>}
      {showFollowup && <Bubble>{followup}</Bubble>}
    </WAChrome>
  )
}
