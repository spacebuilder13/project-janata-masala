import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import StagePanel from '@/components/sandy/StagePanel'
import VoiceAgent from '@/components/explorations/VoiceAgent'

export default function ExplorationsVoice() {
  return (
    <PageShell variant="scroll">
      <PageIntro
        eyebrow="Explorations · Voice"
        title="Voice order-taking & system flow"
        sub="Demo voice agent for orders and enquiries. Claude returns structured output — watch Inventory, Orders, CRM, and Finance update in sequence."
        accent="spice"
        wide
      />
      <StagePanel>
        <VoiceAgent />
      </StagePanel>
    </PageShell>
  )
}
