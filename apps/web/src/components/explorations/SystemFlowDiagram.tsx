import { useEffect, useState } from 'react'
import DiagramFlow from '../sandy/DiagramFlow'

type Props = {
  structured: {
    order?: unknown
    inventory_delta?: unknown
    crm_note?: unknown
    finance_entry?: unknown
  }
}

const STEPS = [
  { key: 'voice', label: 'Voice conversation ends', tag: 'elevenlabs + claude' },
  { key: 'orchestrator', label: 'Claude extracts structured JSON', tag: 'output_config.format' },
  { key: 'inventory', label: 'Inventory updated', tag: 'sku qty delta' },
  { key: 'orders', label: 'Order created', tag: 'order mgmt' },
  { key: 'crm', label: 'CRM note added', tag: 'customer record' },
  { key: 'finance', label: 'Finance entry logged', tag: 'receivable' },
]

export default function SystemFlowDiagram({ structured }: Props) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setActiveStep(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), i * 800))
    })
    return () => timers.forEach(clearTimeout)
  }, [structured])

  const phases = STEPS.map((s, i) => ({
    label: s.label,
    tag: s.tag,
    active: i <= activeStep,
  }))

  return (
    <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
      <p className="caption-label caption-label--spice mb-6">
        Real-time system flow
      </p>
      <DiagramFlow phases={phases} animateActive />
    </div>
  )
}
