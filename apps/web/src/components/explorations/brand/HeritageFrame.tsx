import LivingLines from '../../sandy/LivingLines'
import { heritageFrame } from '@/data/brand-mockups'

export default function HeritageFrame() {
  return (
    <div className="hero-banner">
      <div className="hero-banner-ll" aria-hidden="true">
        <LivingLines gap={28} />
      </div>
      <div className="hero-banner-body">
        <p className="caption-label caption-label--spice">Heritage framing</p>
        <h2 className="serif text-2xl md:text-3xl mt-3">{heritageFrame.headline}</h2>
        <p className="caption-text mt-4">{heritageFrame.body}</p>
      </div>
    </div>
  )
}
