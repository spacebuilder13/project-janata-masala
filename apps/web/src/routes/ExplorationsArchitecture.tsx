import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import ArchitectureDiagram from '@/components/explorations/ArchitectureDiagram'

export default function ExplorationsArchitecture() {
  return (
    <PageShell variant="wide">
      <PageIntro
        eyebrow="Explorations · Architecture"
        title="Agentic commerce for Janata Masala"
        sub="Multiple specialized agents — voice intake, catalogue, inventory, orders, CRM, finance — orchestrated by Claude."
        accent="spice"
        wide
      />
      <div className="jm-section">
        <ArchitectureDiagram />
      </div>
    </PageShell>
  )
}
