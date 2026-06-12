import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import SectionHead from '@/components/sandy/SectionHead'
import CommerceRoadmap from '@/components/explorations/CommerceRoadmap'
import ArchitectureDiagram from '@/components/explorations/ArchitectureDiagram'

export default function ExplorationsArchitecture() {
  return (
    <PageShell variant="wide">
      <PageIntro
        eyebrow="Explorations · Roadmap"
        title="Commerce 101 roadmap"
        sub="Three operational pillars and the path to agentic commerce — Crawl before Run."
        accent="spice"
        wide
      />
      <div className="jm-section">
        <CommerceRoadmap />
      </div>
      <div className="jm-section">
        <SectionHead id="agentic-architecture" eyebrow="Target state" title="Agentic architecture" />
        <ArchitectureDiagram />
      </div>
    </PageShell>
  )
}
