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
    title: 'Brand, content & WhatsApp door',
    weeks: '4 weeks',
    status: 'in-progress',
    jmPhase: 'Four-segment matrix',
    deliverables: [
      '50-page branding book (palette, fonts, voice, mockups, packaging template)',
      'In-store shoot workshop + hook/transition templates',
      'WhatsApp Business + catalog + Channels',
      'Meta + IG ad targeting for WhatsApp trial',
    ],
  },
  {
    id: 'p2',
    number: 2,
    title: 'Store runs without Jay',
    weeks: '4–6 weeks',
    status: 'planned',
    jmPhase: 'Flexible scope',
    deliverables: [
      'Conversational order flow with bill + payment link',
      'CRM setup — order history + preferences',
      'Sensory content + testimonial cadence on Instagram',
      'Voice agent experiments for inbound orders',
    ],
  },
  {
    id: 'p3',
    number: 3,
    title: 'Autonomous growth',
    weeks: '4–6 weeks',
    status: 'planned',
    jmPhase: 'Flexible scope',
    deliverables: [
      'Agentic CRM — AI-assisted order intake',
      'Voice agents integrated with inventory + orders',
      'CRM-personalized content at scale',
      'Multi-store brand system ready for expansion',
    ],
  },
]
