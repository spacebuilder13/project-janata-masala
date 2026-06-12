type Accent = 'default' | 'spice' | 'gold'

type Props = {
  id?: string
  eyebrow: string
  title: string
  blurb?: string
  accent?: Accent
}

const eyebrowClass: Record<Accent, string> = {
  default: 'slide-eyebrow',
  spice: 'slide-eyebrow slide-eyebrow--spice',
  gold: 'slide-eyebrow slide-eyebrow--gold',
}

export default function SectionHead({ id, eyebrow, title, blurb, accent = 'spice' }: Props) {
  return (
    <header id={id} className={`slide-head${id ? ' jm-section-anchor' : ''}`}>
      <p className={eyebrowClass[accent]}>{eyebrow}</p>
      <h2 className="serif text-2xl md:text-3xl mt-2">{title}</h2>
      {blurb && <p className="caption-text mt-2 max-w-2xl">{blurb}</p>}
    </header>
  )
}
