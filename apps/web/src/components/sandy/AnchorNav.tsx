type Section = { id: string; label: string }

type Props = { sections: Section[] }

export default function AnchorNav({ sections }: Props) {
  return (
    <nav
      className="sticky top-[65px] z-30 flex gap-2 overflow-x-auto py-3 px-6 border-b backdrop-blur-sm"
      style={{ borderColor: 'var(--color-sandy-line)', background: 'color-mix(in oklab, var(--color-sandy-bg) 90%, transparent)' }}
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="mono text-[10px] whitespace-nowrap px-3 py-1.5 rounded-full border transition-opacity hover:opacity-80"
          style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-sandy-ink-soft)' }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  )
}
