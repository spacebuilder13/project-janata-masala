export type BrandItem = {
  id: string
  title: string
  description: string
  tag: string
}

export const heritageFrame = {
  headline: 'Sabyasachi, not Zara',
  body: '"Janta" is heritage authority — where serious buyers come for originality. The Gujarati-Kachchi community demands quality, not aspirational premium alone.',
}

export const brandItems: BrandItem[] = [
  {
    id: 'workshop',
    title: 'Workshop system',
    description: 'TQi teaches staff to shoot semi-aesthetic phone videos at the store. Templates for hooks, transitions, cuts. TQi edits into reels.',
    tag: 'content ops',
  },
  {
    id: 'sensory-kaju',
    title: '13mm Kaju USP',
    description: 'Sensory reel: cashew size comparison. "Not found elsewhere" — product purity over pretty packaging.',
    tag: 'sensory',
  },
  {
    id: 'sensory-spice',
    title: 'Spice crush',
    description: 'Vibrant red chilies, haldi crushed to powder — evoke purity and craft in high-production reels.',
    tag: 'sensory',
  },
  {
    id: 'packaging',
    title: 'Dry fruit packaging template',
    description: 'One templatized pack design within 50k budget. Jay duplicates across product lines for private label expansion.',
    tag: 'packaging',
  },
  {
    id: 'perf-marketing',
    title: 'Ghatkopar performance ads',
    description: 'Meta ads targeting affluent Gujarati-Kachchi housewives. 30% revenue lift on low-stake items → larger retainer path.',
    tag: 'performance',
  },
  {
    id: 'testimonials',
    title: 'Testimonial reels',
    description: 'Target user testimonials populated on Instagram, then leveraged via performance marketing.',
    tag: 'social proof',
  },
  {
    id: 'bundles',
    title: 'Curated essentials',
    description: 'Monthly Essentials, Summer Fiesta, Navratri Essentials — increase AOV vs single-item orders.',
    tag: 'commerce',
  },
]
