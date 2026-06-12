import { useState } from 'react'
import { DEFAULT_VOICE_AGENT, type VoiceAgentKey } from '@/data/voice-agents'
import AgentPicker from './voice/AgentPicker'
import LiveVoicePanel from './voice/LiveVoicePanel'
import OrderBillCard from './voice/OrderBillCard'
import ForDevinPanel from './voice/ForDevinPanel'
import SystemFlowDiagram from './SystemFlowDiagram'
import { useLiveVoice } from '@/hooks/useLiveVoice'

export default function VoiceAgent() {
  const [selectedAgent, setSelectedAgent] = useState<VoiceAgentKey>(DEFAULT_VOICE_AGENT)
  const {
    agentMeta,
    status,
    hint,
    timer,
    structured,
    devin,
    startCall,
    endCall,
    reset,
    canStart,
    canEnd,
    liveEnabled,
  } = useLiveVoice(selectedAgent)

  const callActive = status === 'live' || status === 'connecting' || status === 'extracting'
  const pickerDisabled = callActive

  const handleStart = () => {
    startCall().catch((e) => console.error('startCall', e))
  }

  const handleEnd = () => {
    endCall().catch((e) => console.error('endCall', e))
  }

  const handleAgentSelect = (key: VoiceAgentKey) => {
    if (pickerDisabled || key === selectedAgent) return
    setSelectedAgent(key)
  }

  return (
    <div className="voice-agent">
      {!liveEnabled && (
        <p className="voice-hint" style={{ margin: 0 }}>
          Set VITE_ENABLE_LIVE_VOICE=true and configure ElevenLabs + Anthropic keys on Vercel.
        </p>
      )}

      <AgentPicker selected={selectedAgent} disabled={pickerDisabled} onSelect={handleAgentSelect} />

      <LiveVoicePanel
        agentLabel={agentMeta.label}
        agentTagline={agentMeta.tagline}
        status={status}
        hint={hint}
        timer={timer}
        canStart={canStart}
        canEnd={canEnd}
        onStart={handleStart}
        onEnd={handleEnd}
        onReset={reset}
      />

      {structured && (
        <div className="voice-results">
          <OrderBillCard structured={structured} />
          <SystemFlowDiagram structured={structured} />
        </div>
      )}

      {devin && <ForDevinPanel devin={devin} />}
    </div>
  )
}
