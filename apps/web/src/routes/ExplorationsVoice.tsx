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
        sub="Try Priya (fast list-dump) or Meera (warm counter expert with inventory, launches, and pairings). Claude extracts structured output after each call."
        accent="spice"
        wide
      />
      <StagePanel>
        <VoiceAgent />
      </StagePanel>
    </PageShell>
  )
}
