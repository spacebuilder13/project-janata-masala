import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import CommerceRoadmap from '@/components/explorations/CommerceRoadmap'

export default function ExplorationsArchitecture() {
  return (
    <PageShell variant="wide">
      <PageIntro
        eyebrow="Explorations · Roadmap"
        title="Commerce 101 roadmap"
        sub="Three operational pillars — CRM, WhatsApp backbone, inward inventory. Crawl before Run."
        accent="spice"
        wide
      />
      <div className="jm-section">
        <CommerceRoadmap />
      </div>
    </PageShell>
  )
}
