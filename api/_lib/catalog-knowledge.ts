import { catalog, type CatalogItem } from './catalog'

const skuMap = () => new Map(catalog.items.map((i) => [i.sku, i]))

export function getCatalogByCategory(): string {
  const labels = (catalog as { category_labels?: Record<string, string> }).category_labels ?? {}
  const groups = new Map<string, CatalogItem[]>()

  for (const item of catalog.items) {
    const cat = item.category ?? 'other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(item)
  }

  const lines: string[] = []
  for (const [cat, items] of groups) {
    const heading = labels[cat] ?? cat
    lines.push(`### ${heading}`)
    for (const i of items) {
      const launch = i.new_launch ? ' [NEW]' : ''
      lines.push(`- ${i.sku} | ${i.name} | ${i.unit} | ₹${i.price_per_unit}${launch}`)
    }
    lines.push('')
  }
  return lines.join('\n').trim()
}

export function getNewLaunches(): string {
  const launches = catalog.items.filter((i) => i.new_launch)
  if (!launches.length) return '(none)'
  return launches
    .map((i) => `- **${i.name}** (${i.sku}) — ₹${i.price_per_unit}/${i.unit}. Naya launch, try karo.`)
    .join('\n')
}

export function getPairingMatrix(): string {
  const bySku = skuMap()
  const seen = new Set<string>()
  const lines: string[] = []

  for (const item of catalog.items) {
    if (!item.pairs_with?.length) continue
    for (const pairSku of item.pairs_with) {
      const pair = bySku.get(pairSku)
      if (!pair) continue
      const key = [item.sku, pairSku].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      lines.push(`- Customer has **${item.name}** → suggest **${pair.name}** (${pair.sku})`)
    }
  }

  return lines.slice(0, 24).join('\n')
}

export function getPairingSuggestions(cartSkus: string[]): CatalogItem[] {
  const bySku = skuMap()
  const inCart = new Set(cartSkus)
  const suggestions: CatalogItem[] = []
  const added = new Set<string>()

  for (const sku of cartSkus) {
    const item = bySku.get(sku)
    if (!item?.pairs_with) continue
    for (const pairSku of item.pairs_with) {
      if (inCart.has(pairSku) || added.has(pairSku)) continue
      const pair = bySku.get(pairSku)
      if (pair) {
        suggestions.push(pair)
        added.add(pairSku)
      }
    }
  }

  return suggestions.slice(0, 3)
}

export function buildCatalogKnowledgeMarkdown(): string {
  return `# Janata Masala Demo Catalog (generated)

Store: ${catalog.store} | Version: ${catalog.version} | Currency: ${catalog.currency}

## Full inventory by category

${getCatalogByCategory()}

## New launches (mention proactively once per call)

${getNewLaunches()}

## Pairing suggestions (max 2 per call, soft offer)

${getPairingMatrix()}

## Rules
- Prices and SKUs only from this catalog — never invent
- If customer asks "kya kya hai": give 2–3 examples per category, not full list
- Pairing: one suggestion at a time; accept "nahi" gracefully
`
}
