import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import CommerceRoadmap from '@/components/explorations/CommerceRoadmap'

export default function ExplorationsArchitecture() {
  return (
    <PageShell variant="wide">
      <PageIntro
        eyebrow="Explorations · Roadmap"
        title="Agentic commerce roadmap"
        sub="Phase 1 lays out four segments — brand, content, WhatsApp, and paid reach. Phases 2 and 3 evolve flexibly based on what Phase 1 unlocks."
        accent="spice"
        wide
      />
      <div className="jm-section">
        <CommerceRoadmap />
      </div>
    </PageShell>
  )
}
