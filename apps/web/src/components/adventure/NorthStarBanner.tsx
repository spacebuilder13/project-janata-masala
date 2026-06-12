import LivingLines from '../sandy/LivingLines'
import { northStar } from '@/data/strategy'

export default function NorthStarBanner({ sectionId }: { sectionId?: string }) {
  return (
    <div className="hero-banner">
      <div className="hero-banner-ll" aria-hidden="true">
        <LivingLines gap={28} />
      </div>
      <div className="hero-banner-body">
        <p id={sectionId} className={`caption-label caption-label--spice${sectionId ? ' jm-section-anchor' : ''}`}>North star</p>
        <h2 className="serif text-2xl md:text-3xl mt-3">{northStar.question}</h2>
        <p className="caption-text mt-4">{northStar.thesis}</p>
        <p className="text-secondary mt-3" style={{ color: 'var(--color-sandy-ink-faint)' }}>{northStar.context}</p>
      </div>
    </div>
  )
}
