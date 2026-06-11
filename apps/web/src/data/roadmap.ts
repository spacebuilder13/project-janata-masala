export type RoadmapPhase = {
  id: string
  number: number
  title: string
  weeks: string
  status: 'planned' | 'in-progress' | 'done'
  deliverables: string[]
  jmPhase: string
}

export const phases: RoadmapPhase[] = [
  {
    id: 'p1',
    number: 1,
    title: 'Branding & Instagram',
    weeks: '~4 weeks',
    status: 'in-progress',
    jmPhase: 'CDS WPI + Janta Stores',
    deliverables: [
      'Branding book: logo, color/font palettes, 10 mockups',
      'Instagram launch — discovery and awareness content',
      'Workshop: semi-aesthetic phone videos at store',
      'WhatsApp number + manual operator for inquiries',
      'One packaging template (dry fruits, replicable)',
    ],
  },
  {
    id: 'p2',
    number: 2,
    title: 'Foundational Systems',
    weeks: '4–6 weeks',
    status: 'planned',
    jmPhase: 'Back-end integration',
    deliverables: [
      'Inventory management module',
      'Order intake and logistics',
      'Systems that talk to each other (replace pen-and-paper)',
      'Documented goods lifecycle: storage → dispatch',
    ],
  },
  {
    id: 'p3',
    number: 3,
    title: 'Digital Interface',
    weeks: '4–6 weeks',
    status: 'planned',
    jmPhase: 'Rupsub destination',
    deliverables: [
      'WhatsApp-led conversational interface (or hybrid + voice)',
      'Full Agentic CRM deployment',
      'Automated billing + payment links',
      'Real-time inventory across locations',
    ],
  },
]
