import type { ReactNode } from 'react'
import './chrome.css'
import './bubbles.css'

type Props = {
  children: ReactNode
  wallpaper?: 'default' | 'jm'
  composer?: ReactNode
  unread?: boolean
  accent?: string
}

export default function WAChrome({
  children,
  wallpaper = 'default',
  composer,
  unread,
  accent,
}: Props) {
  const threadClass =
    wallpaper === 'jm' ? 'wa-chrome__thread-wrap wa-chrome__thread-wrap--jm' : 'wa-chrome__thread-wrap'

  return (
    <div className="wa-chrome" style={accent ? { ['--wa-accent' as string]: accent } : undefined}>
      <div className="wa-chrome__status">
        <span className="wa-chrome__status-time">9:41</span>
        <span>•••• 5G</span>
      </div>

      <div className="wa-chrome__header">
        <span className="wa-chrome__back">‹</span>
        <div className="wa-chrome__avatar">JM</div>
        <div className="wa-chrome__id">
          <div className="wa-chrome__name">Janata Masala</div>
          <div className="wa-chrome__sub">business account</div>
        </div>
        <span className="wa-chrome__icons">📞 ⋮</span>
      </div>

      <div className={threadClass}>
        {unread && (
          <div className="wa-chrome__unread">
            <span>UNREAD MESSAGES</span>
          </div>
        )}
        <div className="wa-chrome__thread">{children}</div>
      </div>

      <div className="wa-chrome__composer">
        {composer ?? (
          <>
            <div className="wa-chrome__input">
              <span>Message</span>
              <span>📎 📷</span>
            </div>
            <div className="wa-chrome__mic">🎤</div>
          </>
        )}
      </div>
    </div>
  )
}
