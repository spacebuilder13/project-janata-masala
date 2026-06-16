import { missionPrimaryTabs } from '@/data/mission-center'

type PrimaryTab = 'business' | 'engagement' | 'roadmap'

type Props = {
  active: PrimaryTab
  onChange: (id: PrimaryTab) => void
}

export default function MissionPrimaryNav({ active, onChange }: Props) {
  return (
    <nav className="mc-seg-nav" role="tablist" aria-label="Mission sections">
      {missionPrimaryTabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          className={`mc-seg-nav-btn${active === t.id ? ' mc-seg-nav-btn--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="mc-seg-nav-short">{t.shortLabel}</span>
          <span className="mc-seg-nav-long">{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
