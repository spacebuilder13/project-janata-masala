type Accent = 'default' | 'spice' | 'gold'

type Props = {
  eyebrow: string
  title: string
  sub?: string
  accent?: Accent
  wide?: boolean
}

const eyebrowClass: Record<Accent, string> = {
  default: 'slide-eyebrow',
  spice: 'slide-eyebrow slide-eyebrow--spice',
  gold: 'slide-eyebrow slide-eyebrow--gold',
}

export default function PageIntro({ eyebrow, title, sub, accent = 'default', wide }: Props) {
  return (
    <header className="jm-intro slide-head">
      <p className={eyebrowClass[accent]}>{eyebrow}</p>
      <h1 className={`slide-title serif${wide ? ' slide-title--wide' : ''}`}>{title}</h1>
      {sub && <p className="slide-sub">{sub}</p>}
    </header>
  )
}
