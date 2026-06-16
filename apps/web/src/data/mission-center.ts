/** Mission Center v2 — Falcon 2026 engagement framing */

export type BestBet = {
  capability: string
  recommendation: string
}

export type NextAction = {
  id: string
  title: string
  body: string
  owner: 'S&A' | 'Jay' | 'Staff'
  tabLink?: 'roadmap' | 'engagement'
}

export type MissionPanel = {
  id: string
  label: string
  title: string
  blurb: string
}

export const falcon2026 = {
  name: 'Falcon 2026',
  tagline: 'Current objective — modernize Janata Masala\'s operating system without losing neighbourhood trust.',
  engagementKicker: 'Falcon 2026 · About Janata Masala',
  v2Context:
    'Grounded in Jun 2026 discovery sessions and the retail OS synthesis — structure store reality before layering growth or agents.',
}

export const whatsNewBullets = [
  'Mobile-first Mission Center — clear Objective / Model / Roadmap navigation',
  'Architecture table — see each layer on inventory inward and order journey',
  'Best bets — suggested next course of action at the end of Momentum',
]

export const missionPrimaryTabs = [
  {
    id: 'business' as const,
    label: 'Business Objective',
    shortLabel: 'Objective',
    kicker: 'About Janata Masala',
  },
  {
    id: 'engagement' as const,
    label: 'Engagement Model',
    shortLabel: 'Model',
    kicker: 'How we work together',
  },
  {
    id: 'roadmap' as const,
    label: 'Falcon Roadmap',
    shortLabel: 'Roadmap',
    kicker: 'Commerce 101',
  },
]

export const businessPanels: MissionPanel[] = [
  { id: 'today', label: 'Today', title: 'Where we are today', blurb: 'Store reality in numbers and constraints.' },
  {
    id: 'locations',
    label: 'Locations',
    title: 'Two stores, one hyperlocal strategy',
    blurb: 'Ghatkopar hub and Tilak Nagar growth pocket.',
  },
  { id: 'vision', label: 'Vision', title: 'Where we want to go', blurb: 'Goals, conversion targets, and priority investments.' },
  { id: 'community', label: 'Community', title: 'Stories that matter', blurb: 'Trust and neighbourhood loyalty in their own words.' },
]

export const engagementPanels: MissionPanel[] = [
  {
    id: 'strategy',
    label: 'Strategy',
    title: 'Crawl, Walk, Run',
    blurb: 'Commerce 101 thesis and phased engagement model.',
  },
  {
    id: 'architecture',
    label: 'Architecture',
    title: 'Seven-layer operating stack',
    blurb: 'How each layer applies to inventory inward and customer orders.',
  },
  {
    id: 'momentum',
    label: 'Momentum',
    title: 'Prioritization and next moves',
    blurb: 'Adoption × impact matrix and suggested course of action.',
  },
]

export const bestBets: BestBet[] = [
  {
    capability: 'Customer communication',
    recommendation: 'WhatsApp-first flows — confirmations, repeat orders, structured commerce channel.',
  },
  {
    capability: 'Customer memory',
    recommendation: 'Order-history-driven CRM — real buying behaviour, not profile forms.',
  },
  {
    capability: 'Inventory intelligence',
    recommendation: 'Inward inventory + fast-moving SKU tracking — weeks-of-stock visibility first.',
  },
  {
    capability: 'Store operations',
    recommendation: 'Staff-first internal console — digital notebook under rush-hour pressure.',
  },
]

export const nextActions: NextAction[] = [
  {
    id: 'structure',
    title: 'Structure memory',
    body: 'Stand up customer database, SKU base, order ledger, and supplier list — the crawl foundation.',
    owner: 'S&A',
    tabLink: 'roadmap',
  },
  {
    id: 'capture',
    title: 'Stabilize daily capture',
    body: 'Order capture, digital bills, stock inward, and Jay\'s exception summary — not raw logs.',
    owner: 'Staff',
    tabLink: 'roadmap',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp backbone pilot',
    body: 'Confirmation flows and repeat-order memory on the highest-adoption, highest-impact quadrant.',
    owner: 'Jay',
    tabLink: 'engagement',
  },
]

export const momentumCompact = [
  {
    title: 'Build first',
    body: 'Priority investments quadrant — high adoption, high commercial impact.',
  },
  {
    title: 'Defer',
    body: 'Consumer app, Sheets as SoR, autonomous AI, perfect inventory before inward discipline.',
  },
  {
    title: 'Rules before agents',
    body: 'Deterministic workflows on clean records; AI amplifies later.',
  },
]

export function getPrimaryTabMeta(id: 'business' | 'engagement' | 'roadmap') {
  return missionPrimaryTabs.find((t) => t.id === id)!
}

export function getPanelMeta(
  tab: 'business' | 'engagement',
  panelId: string,
): MissionPanel | undefined {
  const list = tab === 'business' ? businessPanels : engagementPanels
  return list.find((p) => p.id === panelId)
}
