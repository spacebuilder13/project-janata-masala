import fs from 'fs'
import path from 'path'

export type CatalogItem = {
  sku: string
  name: string
  aliases?: string[]
  unit: string
  price_per_unit: number
  premium?: boolean
  category?: string
  new_launch?: boolean
  pairs_with?: string[]
}

export type Catalog = {
  version: string
  currency: string
  store: string
  items: CatalogItem[]
}

function loadCatalog(): Catalog {
  const p = path.join(process.cwd(), 'api/data/catalog.demo.json')
  return JSON.parse(fs.readFileSync(p, 'utf8')) as Catalog
}

export const catalog = loadCatalog()

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
