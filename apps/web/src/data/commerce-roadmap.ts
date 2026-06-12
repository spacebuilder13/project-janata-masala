/** Commerce 101 roadmap — operational three pillars (synthesis, Jun 2026) */

export type SegmentId = 'crm' | 'whatsapp' | 'inventory'

export type RoadmapItem = {
  text: string
  note?: string
}

export type Phase1Segment = {
  id: SegmentId
  title: string
  intro?: string
  primaryDeliverable?: string
  bookContentsLabel?: string
  items: RoadmapItem[]
  footnote?: string
  movedToPhase2?: string[]
}

export type DirectionalItem = {
  text: string
  segment?: SegmentId
}

export type TechInitiative = {
  title: string
  description: string
  status: 'active' | 'planned' | 'future'
}

export type RoadmapPhase = {
  number: 1 | 2 | 3
  label: string
  duration: string
  scopeBadge?: 'active'
  flexibleScope?: boolean
  objective: string
  unlockStatement: string
  segments?: Phase1Segment[]
  techInitiatives?: TechInitiative[]
  inputGoals?: string[]
  inputGoalsTbd?: boolean
  directionalScope?: DirectionalItem[]
}

export const segmentMeta: Record<SegmentId, { label: string; colorVar: string }> = {
  crm: { label: 'CRM', colorVar: '--color-pillar-crm' },
  whatsapp: { label: 'WhatsApp backbone', colorVar: '--color-pillar-whatsapp' },
  inventory: { label: 'Inward inventory', colorVar: '--color-pillar-inventory' },
}

export const techInitiatives: TechInitiative[] = [
  {
    title: 'After-hours chatbot',
    description: 'Rule-based ordering capture 10 PM–10 AM while the store is closed — no leads lost overnight.',
    status: 'planned',
  },
  {
    title: 'AI voice agent v1',
    description: 'Handle initial customer inquiries and list-dump orders — see Voice demos (Priya + Meera).',
    status: 'active',
  },
  {
    title: 'QR / barcode tagging',
    description: 'Scanner-driven stock updates — reconcile purchase invoices with physical stock. Walk/Run phase.',
    status: 'future',
  },
]

export const roadmapPhases: RoadmapPhase[] = [
  {
    number: 1,
    label: 'Crawl',
    duration: 'Phase 1',
    scopeBadge: 'active',
    objective:
      'Establish CRM, WhatsApp commerce backbone, and inward inventory tracking — every customer interaction becomes a data channel.',
    unlockStatement:
      'Janata Masala has a structured customer database, WhatsApp-led ordering with digital bills, and weeks-of-stock visibility on inbound goods.',
    techInitiatives,
    segments: [
      {
        id: 'crm',
        title: 'CRM — structured data',
        intro:
          'Move from pen-and-paper to a database of names, phone numbers, and addresses. The business\'s biggest asset.',
        primaryDeliverable: '10,000 contact database',
        items: [
          { text: 'Digitize existing customer records', note: 'Names, phones, addresses from order history' },
          { text: 'Mandatory data on every interaction', note: 'Phone + address required for delivery' },
          { text: 'Funnel marketing readiness', note: 'Target segments for seasonal launches (e.g. mango pickles)' },
          { text: 'Re-engagement triggers', note: 'Identify gaps — e.g. haldi buyer who hasn\'t returned in a year' },
        ],
        footnote: 'Goal: 1% conversion on 10,000 beats 1% on 100 — back-of-napkin math that scales.',
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp backbone',
        intro:
          'Replace phone-call ordering with WhatsApp — share inventory, confirm orders, send digital bills.',
        primaryDeliverable: 'WhatsApp Business commerce flow',
        items: [
          { text: 'Product catalog in WhatsApp', note: 'Every SKU browsable and shareable' },
          { text: 'List-dump order flow', note: 'Customer sends list → bill + payment link in chat' },
          { text: 'Digital bills force data capture', note: 'Number and address mandatory for delivery' },
          { text: 'WhatsApp Channels', note: 'Seasonal updates for moms and older generation' },
        ],
      },
      {
        id: 'inventory',
        title: 'Inward inventory (Phase 1)',
        intro:
          'Track goods the moment they arrive from suppliers — move from counting cans to knowing weeks of stock.',
        primaryDeliverable: 'Supplier inward tracking',
        items: [
          { text: 'Log goods on arrival', note: 'Reconcile purchase invoices with physical receipt' },
          { text: 'Weeks-of-stock calculation', note: 'Owner knows when to reorder before running out' },
          { text: 'Low-stock alerts', note: 'D-Mart level — system flags reorder points' },
          { text: 'QR/barcode tagging', note: 'Future — scanner automation in Walk/Run phase' },
        ],
        footnote: 'Follow the money through the inventory lifecycle — inward first, outward later.',
      },
    ],
  },
  {
    number: 2,
    label: 'Walk',
    duration: 'Phase 2',
    flexibleScope: true,
    objective:
      'Hyper-local growth — founder-led content, funnel marketing on the CRM, and after-hours capture.',
    unlockStatement:
      'Revenue grows through loyalists within 1 km — founder-led reels build community trust without agency spend.',
    inputGoals: [
      'Utsav teaches Jay to shoot and edit authentic reels',
      'Target 40–65 Gujarati/Kachchi women within 1 km of each store',
      'After-hours chatbot captures orders 10 PM–10 AM',
      'Voice agent handles inbound list-dump during peak hours',
    ],
    directionalScope: [
      { text: 'Founder-led Instagram — community tone over fancy production', segment: 'crm' },
      { text: 'Heeraben-style testimonial cadence', segment: 'crm' },
      { text: 'Personalized WhatsApp re-engagement (haldi reminders)', segment: 'crm' },
      { text: 'Conversational order flow with payment links', segment: 'whatsapp' },
      { text: 'CRM-linked seasonal campaigns', segment: 'whatsapp' },
      { text: 'Outbound inventory tracking — dispatch and fulfillment', segment: 'inventory' },
    ],
  },
  {
    number: 3,
    label: 'Run',
    duration: 'Phase 3',
    flexibleScope: true,
    objective:
      'Premium brand investment and autonomous growth — only after Commerce 101 drives top-line profit.',
    unlockStatement:
      'Janata Masala serves and grows autonomously. Jay is free to scale — branding book, agency marketing, multi-store expansion.',
    inputGoals: [
      '50-page brand book and packaging system (deferred from Crawl)',
      'Agency-managed production at scale',
      'Full agentic CRM — AI-assisted order intake and personalization',
      'Multi-store brand system ready for expansion',
    ],
    directionalScope: [
      { text: 'Comprehensive branding book — palette, voice, mockups, packaging templates', segment: 'crm' },
      { text: 'Agentic CRM — birthdays, preferences, product affinity at scale', segment: 'crm' },
      { text: 'QR/barcode scanners — automated stock lifecycle', segment: 'inventory' },
      { text: 'Voice agents integrated with inventory + order management', segment: 'whatsapp' },
      { text: 'Full Meta + IG campaigns with CRM retargeting', segment: 'whatsapp' },
    ],
  },
]

export const flexibleScopeNote =
  'Walk and Run scope is flexible — items shift based on Crawl outcomes and top-line growth.'
