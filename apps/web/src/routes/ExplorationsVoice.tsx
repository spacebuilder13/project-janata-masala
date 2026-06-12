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
        sub="Live voice order-taking with Priya at the counter. Speak your list — Claude extracts structured output and the system flow updates in sequence."
        accent="spice"
        wide
      />
      <StagePanel>
        <VoiceAgent />
      </StagePanel>
    </PageShell>
  )
}
