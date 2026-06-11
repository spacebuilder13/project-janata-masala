type Props = { eyebrow: string; title: string; blurb?: string }

export default function SectionHead({ eyebrow, title, blurb }: Props) {
  return (
    <div className="mb-6">
      <p className="mono" style={{ color: 'var(--color-jm-spice)' }}>{eyebrow}</p>
      <h2 className="serif text-2xl md:text-3xl mt-2">{title}</h2>
      {blurb && <p className="mt-2 text-sm max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>{blurb}</p>}
    </div>
  )
}
