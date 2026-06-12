import catalogData from '../../data/catalog.demo.json'

export type CatalogItem = {
  sku: string
  name: string
  aliases?: string[]
  unit: string
  price_per_unit: number
  premium?: boolean
}

export type Catalog = {
  version: string
  currency: string
  store: string
  items: CatalogItem[]
}

export const catalog = catalogData as Catalog

export function getCatalogSummary(): string {
  return catalog.items
    .map((i) => `${i.sku}|${i.name}|${i.unit}|₹${i.price_per_unit}`)
    .join('\n')
}

export function validateSkus(skus: string[]): { ok: boolean; errors: string[] } {
  const known = new Set(catalog.items.map((i) => i.sku))
  const errors = skus.filter((s) => s && !known.has(s))
  return { ok: errors.length === 0, errors }
}
