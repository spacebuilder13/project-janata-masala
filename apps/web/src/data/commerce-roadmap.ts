/** Source: knowledge/janata_masala_roadmap.md */

export type SegmentId = 'brand' | 'content' | 'whatsapp' | 'performance'

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

export type RoadmapPhase = {
  number: 1 | 2 | 3
  label: string
  duration: string
  scopeBadge?: 'active'
  flexibleScope?: boolean
  objective: string
  unlockStatement: string
  segments?: Phase1Segment[]
  inputGoals?: string[]
  inputGoalsTbd?: boolean
  directionalScope?: DirectionalItem[]
}

export const segmentMeta: Record<SegmentId, { label: string; colorVar: string }> = {
  brand: { label: 'Brand identity', colorVar: '--color-rm-brand' },
  content: { label: 'Content + Instagram', colorVar: '--color-rm-content' },
  whatsapp: { label: 'WhatsApp CRM + commerce', colorVar: '--color-rm-whatsapp' },
  performance: { label: 'Performance marketing', colorVar: '--color-rm-performance' },
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    number: 1,
    label: 'Phase 1',
    duration: '4 weeks',
    scopeBadge: 'active',
    objective: 'Give Janata Masala its brand, its first content system, and its WhatsApp door',
    unlockStatement:
      'Janata Masala has a brand, a content engine, an open WhatsApp door, and its first paid reach into the community.',
    segments: [
      {
        id: 'brand',
        title: 'Brand identity',
        intro:
          'All items below are components of a single deliverable: a comprehensive 50-page branding book. The book is the deliverable — not each item in isolation. Brand identity flows from the branding book.',
        primaryDeliverable: 'Comprehensive 50-page branding book',
        bookContentsLabel: 'Contents of the branding book',
        items: [
          { text: 'Color palette', note: 'Defined hex values + usage guidelines' },
          { text: 'Font palette', note: 'Typefaces + typographic hierarchy' },
          { text: 'Brand voice + tone', note: 'How Janata Masala speaks and feels' },
          { text: 'Taglines' },
          { text: '10 brand use case mockups', note: 'Brand shown in real-world contexts' },
          {
            text: 'Reusable packaging template',
            note: 'Example format: dry fruits — Jay replicates the template across other product categories himself',
          },
        ],
        footnote: 'Logo is not in scope. Client has explicitly signalled no logo change.',
      },
      {
        id: 'content',
        title: 'Content + Instagram',
        intro:
          "Phase 1 scope is intentionally narrow here. The goal is to give Jay's team the tools to create content independently — not to create content for them at scale yet.",
        items: [
          {
            text: 'In-store shoot workshop',
            note: "TQi teaches Jay's team to shoot semi-aesthetic videos on their phones",
          },
          {
            text: 'Hook, transition + cut templates',
            note: 'Consistent format for anyone on the team to use',
          },
        ],
        movedToPhase2: [
          'TQi editing raw footage into reels',
          'Sensory-first content direction (spices being crushed, 13mm cashews, purity cues)',
          'Testimonial videos from housewife demographic',
          'Populating Instagram with testimonial content',
        ],
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp CRM + commerce',
        intro: 'Goal for Phase 1: completely functional for human-operator-led usage. No automation yet.',
        items: [
          { text: 'WhatsApp Business account setup' },
          {
            text: 'Full product portfolio loaded into WA catalog',
            note: 'Every SKU browsable + shareable from WhatsApp',
          },
          {
            text: 'WhatsApp Channels configured',
            note: 'New arrival updates — built for moms + older generation',
          },
        ],
      },
      {
        id: 'performance',
        title: 'Performance marketing',
        intro:
          'Strategy: Push mid-quality videos — the kind created via the in-store phone-video workshop — repeatedly to target segments to encourage them to try placing an order via WhatsApp. A portion of the budget is allocated to performance marketing to drive immediate trials during this initial phase.',
        items: [
          {
            text: 'Meta + IG ad targeting setup',
            note: 'Affluent Gujarati + Kachchi community, Ghatkopar belt',
          },
          {
            text: 'Initial campaigns on low-stake items',
            note: 'Drive WhatsApp trial, not just reach or impressions',
          },
        ],
      },
    ],
  },
  {
    number: 2,
    label: 'Phase 2',
    duration: '4–6 weeks',
    flexibleScope: true,
    objective: 'Every order can be placed and tracked without Jay on the phone. The store runs without him in the room.',
    unlockStatement: 'Every order can be placed and tracked without Jay on the phone. The store runs without him in the room.',
    inputGoals: [
      'Content reaches a defined number of people',
      'A defined number of WhatsApp conversations initiated directly from the campaign',
      'Begin experimenting with voice agents for inbound order intake',
    ],
    inputGoalsTbd: true,
    directionalScope: [
      { text: 'TQi editing raw footage → high-quality reels with trending music', segment: 'content' },
      { text: 'Sensory-first content (spices crushed, unique product USPs, purity cues)', segment: 'content' },
      { text: 'Testimonial video production + Instagram cadence', segment: 'content' },
      { text: 'Conversational order flow (customer dumps list → immediate bill + payment link)', segment: 'whatsapp' },
      { text: 'CRM setup — links customers to order history + preferences', segment: 'whatsapp' },
      { text: 'CRM-linked ad pushing (right content to right segment at right time)', segment: 'performance' },
      { text: 'Audience segmentation: housewives, bulk buyers, gifting occasion', segment: 'whatsapp' },
    ],
  },
  {
    number: 3,
    label: 'Phase 3',
    duration: '4–6 weeks',
    flexibleScope: true,
    objective: 'Janata Masala serves and grows customers autonomously. Jay is free to open Store 2.',
    unlockStatement: 'Janata Masala serves and grows customers autonomously. Jay is free to open Store 2.',
    inputGoals: [
      'Voice agents integrated with inventory + order management systems',
      'CRM-personalized content running at scale',
      'Multi-store brand system ready for expansion',
    ],
    directionalScope: [
      { text: 'Agentic CRM — AI-assisted autonomous order intake (ChatGPT / Claude powered)', segment: 'whatsapp' },
      { text: 'Refined customer experience: WhatsApp, website, or hybrid model', segment: 'whatsapp' },
      { text: 'Recurring order management', segment: 'whatsapp' },
      { text: 'Full Meta + IG campaigns with CRM-push and retargeting', segment: 'performance' },
      { text: "Full retainer: CRM + videography (TQi\u2019s long-term engagement model)", segment: 'content' },
    ],
  },
]

export const flexibleScopeNote =
  'Directional scope is flexible — items may shift between phases based on outcomes.'
