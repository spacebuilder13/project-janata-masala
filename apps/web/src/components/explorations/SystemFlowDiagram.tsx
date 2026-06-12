import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise } from '@/components/sandy/motion'

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
  { key: 'orchestrator', label: 'Claude extracts structured JSON', tag: 'post-call extract' },
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
      timers.push(setTimeout(() => setActiveStep(i), i * 700))
    })
    return () => timers.forEach(clearTimeout)
  }, [structured])

  return (
    <motion.div
      variants={fadeRise}
      initial="hidden"
      animate="show"
      className="voice-card voice-flow-wrap"
    >
      <p className="caption-label caption-label--spice mb-5">Real-time system flow</p>
      <div className="voice-flow">
        {STEPS.map((step, i) => {
          const active = i <= activeStep
          return (
            <div key={step.key} className="voice-flow-step">
              <div className={`voice-flow-node${active ? ' voice-flow-node--active' : ''}`}>
                <span className="voice-flow-node__label">{step.label}</span>
                <span className="voice-flow-node__tag">{step.tag}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="voice-flow-arrow" aria-hidden="true">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <line x1="10" y1="0" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M5 10 L10 18 L15 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
