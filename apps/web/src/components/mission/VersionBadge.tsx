import { useState, useRef, useEffect } from 'react'
import { missionVersions } from '@/data/mission-versions'

type Props = {
  activeVersion: 'v1' | 'v2'
  onSelect: (id: 'v1' | 'v2') => void
}

export default function VersionBadge({ activeVersion, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = missionVersions.find((v) => v.id === activeVersion)!

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div className="mc-version" ref={ref}>
      <button
        type="button"
        className="mc-version-badge"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {current.label}
      </button>
      {open && (
        <div className="mc-version-picker" role="listbox">
          {missionVersions.map((v) => (
            <button
              key={v.id}
              type="button"
              role="option"
              aria-selected={v.id === activeVersion}
              className={`mc-version-option${v.id === activeVersion ? ' mc-version-option--active' : ''}`}
              onClick={() => {
                onSelect(v.id)
                setOpen(false)
              }}
            >
              <span className="mc-version-option-label">{v.label}</span>
              <span className="mc-version-option-date">{v.date}</span>
              <span className="mc-version-option-summary">{v.summary}</span>
              <ul className="mc-version-changelog">
                {v.changelog.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
