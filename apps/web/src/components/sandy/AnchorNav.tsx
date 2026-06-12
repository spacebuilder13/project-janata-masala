type Section = { id: string; label: string }

type Props = { sections: Section[] }

export default function AnchorNav({ sections }: Props) {
  return (
    <nav className="jm-anchor-nav" aria-label="Page sections">
      <div className="jm-anchor-nav-inner">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="tag whitespace-nowrap">
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
