import type { MissionPanel } from '@/data/mission-center'

type Props = {
  sectionLabel: string
  items: MissionPanel[]
  active: string
  onChange: (id: string) => void
  ariaLabel: string
}

export default function MissionSubNav({ sectionLabel, items, active, onChange, ariaLabel }: Props) {
  const activeItem = items.find((i) => i.id === active)

  return (
    <div className="mc-sub-nav">
      <p className="mc-sub-nav-crumb">
        <span className="mc-sub-nav-section">{sectionLabel}</span>
        {activeItem && (
          <>
            <span className="mc-sub-nav-sep" aria-hidden="true">
              ·
            </span>
            <span className="mc-sub-nav-panel">{activeItem.label}</span>
          </>
        )}
      </p>
      <div className="mc-sub-nav-chips" role="tablist" aria-label={ariaLabel}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            className={`mc-sub-nav-chip${active === item.id ? ' mc-sub-nav-chip--active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
