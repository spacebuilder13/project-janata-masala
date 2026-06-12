import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import HeritageFrame from '@/components/explorations/brand/HeritageFrame'
import BrandSectionGrid from '@/components/explorations/brand/BrandSectionGrid'

export default function ExplorationsBrand() {
  return (
    <PageShell variant="scroll">
      <PageIntro
        eyebrow="Explorations · Brand"
        title="Brand & content direction"
        sub="Heritage authority, workshop content system, sensory storytelling, and performance marketing for Ghatkopar."
        accent="spice"
        wide
      />
      <div className="jm-section">
        <HeritageFrame />
      </div>
      <div className="jm-section">
        <BrandSectionGrid />
      </div>
    </PageShell>
  )
}
