/** Commerce 101 executive brief — synthesis from Jun 2026 discovery sessions */

export type TodayStat = {
  label: string
  value: string
  note?: string
}

export type CrawlWalkRunStep = {
  id: string
  phase: string
  title: string
  summary: string
  items: string[]
  status: 'active' | 'planned' | 'deferred'
}

export type StoreProfile = {
  id: string
  name: string
  tag: string
  description: string
  footnote: string
}

export type CommunityStory = {
  id: string
  tag: string
  title: string
  quote?: string
  body: string
}

export const todayStats: TodayStat[] = [
  { label: 'Annual touchpoints', value: '~30,000', note: 'Across both stores and channels' },
  { label: 'Tilak Nagar daily', value: '<100 customers', note: 'Newer location still building footfall' },
  { label: 'Customer records', value: 'Pen & paper', note: 'Names, phones, addresses unstructured' },
  { label: 'Inventory tracking', value: 'Counting cans', note: 'No weeks-of-stock visibility' },
]

export const todayBullets = [
  'Hyperlocal kirana — customers return for trust and personal conduct, not fancy packaging.',
  'Jay is 25, 2nd gen, ambitious — currently trapped in a single-store operational loop.',
  'Phone-call ordering dominates; every interaction is a missed data collection opportunity.',
]

export const visionFootnote =
  '10,000 structured contacts sit in the Priority investments quadrant — high adoption once capture UX exists, high impact on seasonal launches and repeat orders.'

export const visionGoals = [
  {
    id: 'contacts',
    title: '10,000 structured contacts',
    body: 'Names, phone numbers, and addresses in a CRM — the business\'s most valuable asset.',
  },
  {
    id: 'conversion',
    title: 'Funnel math that scales',
    body: '1% conversion on 10,000 contacts (100 sales) beats 1% on 100 people — especially for seasonal launches like mango pickles.',
  },
  {
    id: 'efficiency',
    title: 'D-Mart level reorder alerts',
    body: 'Know exactly how many weeks of stock remain. System alerts when to reorder — follow the money through inventory.',
  },
  {
    id: 'liberation',
    title: 'Founder liberation',
    body: 'Every system should answer: can Janata Masala run without Jay physically present?',
  },
]

export const conversionChart = {
  title: 'Why 10,000 contacts matter',
  bars: [
    { label: '100 contacts × 1%', value: 1, pct: 1, colorVar: '--color-sandy-ink-faint' },
    { label: '10,000 contacts × 1%', value: 100, pct: 100, colorVar: '--color-jm-spice' },
  ],
  caption: 'Same conversion rate — 100× the sales opportunity on seasonal or new product launches.',
}

export const crawlWalkRun: CrawlWalkRunStep[] = [
  {
    id: 'crawl',
    phase: 'Crawl',
    title: 'Commerce 101 foundation',
    summary: 'Stabilize the pop-store model with structured data, WhatsApp commerce, and inward inventory.',
    items: ['CRM — pen-and-paper to structured database', 'WhatsApp backbone — orders, bills, data capture', 'Inward inventory — track supplier arrivals'],
    status: 'active',
  },
  {
    id: 'walk',
    phase: 'Walk',
    title: 'Hyper-local growth',
    summary: 'Top-line revenue through loyalists — founder-led reels, 1km targeting, community trust.',
    items: ['Founder-led Instagram (Utsav teaches Jay to shoot)', '40–65 Gujarati/Kachchi women, 1km radius', 'Funnel marketing on 10k contacts'],
    status: 'planned',
  },
  {
    id: 'run',
    phase: 'Run',
    title: 'Premium brand & agency scale',
    summary: 'High-end branding and agency marketing — only after base systems drive profit.',
    items: ['50-page brand book (deferred)', 'Agency-managed production (deferred)', 'Multi-store expansion readiness'],
    status: 'deferred',
  },
]

export const stores: StoreProfile[] = [
  {
    id: 'ghatkopar',
    name: 'Ghatkopar',
    tag: '60-year hub',
    description: 'Established community anchor — customers know Jay\'s father by name. Strong Gujarati-Kachchi loyalist base within walking distance.',
    footnote: 'Heritage authority: "Janta" is not a constraint — serious buyers come for trust and quality.',
  },
  {
    id: 'tilak-nagar',
    name: 'Tilak Nagar',
    tag: 'Job locality',
    description: 'Working-class rented area near Vidya Vihar station. Hasn\'t yet captured nearby Neelkanth Valley — residents often order from Ghatkopar instead.',
    footnote: 'Awareness gap: locals don\'t realize a branch exists on their doorstep.',
  },
]

export const hyperLocal = {
  demographic: '40–65 age group — Gujarati and Kachchi women',
  radius: '1 km',
  philosophy: 'Personal smile and conduct over luxury art direction.',
}

export const communityStories: CommunityStory[] = [
  {
    id: 'heeraben',
    tag: 'Community tone',
    title: 'The Heeraben testimonial',
    quote: 'I\'ve bought their pickles for 10 years because I trust the family.',
    body: 'Film a loyal customer simply saying why she loves the store — authentic reels bring 30 more "Heerabens" who trust her word over polished ads.',
  },
  {
    id: 'haldi',
    tag: 'CRM gap',
    title: 'The Haldi reminder',
    body: 'A customer bought turmeric a year ago but never returned. With a proper CRM, the store could send a personalized WhatsApp or call to re-engage — impossible under pen-and-paper today.',
  },
  {
    id: 'kurkure',
    tag: 'Jay\'s call',
    title: 'The ₹1 Kurkure debate',
    body: 'Sell a ₹10 Kurkure for ₹1 to get 1,000 people in the door? Jay rejected it — once you discount, customers demand it forever. Loyalty through value and conduct, not price cuts.',
  },
]
