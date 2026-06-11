export type Benchmark = {
  id: string
  name: string
  subtitle: string
  model: string
  lesson: string
  stackLayer: 'brand' | 'channel' | 'tech'
  jmPhase: string
}

export const benchmarks: Benchmark[] = [
  {
    id: 'cds',
    name: 'CDS WPI',
    subtitle: 'Charlie Daily Stores',
    model: 'Exclusive/imported goods, luxury feeling in every interaction',
    lesson: 'Move beyond commodity — highlight 13mm kaju, sensory content, justify premium pricing',
    stackLayer: 'brand',
    jmPhase: 'Phase 1',
  },
  {
    id: 'janta',
    name: 'Janta Stores',
    subtitle: 'Borivali West',
    model: 'Kirana scaled via back-end digitization, high-touch WhatsApp/phone orders',
    lesson: 'List-dump ordering, bill + payment link in chat — no website required for housewives',
    stackLayer: 'channel',
    jmPhase: 'Phase 1',
  },
  {
    id: 'rupsub',
    name: 'Rupsub',
    subtitle: 'Quick-commerce competitor',
    model: 'Geolocation + CRM + AI voice agents, 10–20 min delivery, 11-store SOP consistency',
    lesson: 'Tech backbone for scale — integrated inventory, orders, CRM when human demand peaks',
    stackLayer: 'tech',
    jmPhase: 'Phase 2–3',
  },
]

export const stackSummary = 'Phase 1 = CDS WPI (brand) + Janta Stores (channel). Rupsub (tech) is the destination.'
