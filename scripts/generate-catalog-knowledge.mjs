#!/usr/bin/env node
/**
 * Generate jm-catalog-knowledge.generated.md from api/data/catalog.demo.json
 * Usage: node scripts/generate-catalog-knowledge.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalogPath = path.join(root, 'api/data/catalog.demo.json')
const voiceLabCatalog = path.join(root, 'voice-lab/data/catalog.demo.json')
const outVoiceLab = path.join(root, 'voice-lab/prompts/jm-catalog-knowledge.generated.md')
const outApi = path.join(root, 'api/data/catalog-knowledge.generated.md')

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))

function byCategory() {
  const labels = catalog.category_labels ?? {}
  const groups = new Map()
  for (const item of catalog.items) {
    const cat = item.category ?? 'other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat).push(item)
  }
  const lines = []
  for (const [cat, items] of groups) {
    lines.push(`### ${labels[cat] ?? cat}`)
    for (const i of items) {
      const launch = i.new_launch ? ' [NEW]' : ''
      lines.push(`- ${i.sku} | ${i.name} | ${i.unit} | ₹${i.price_per_unit}${launch}`)
    }
    lines.push('')
  }
  return lines.join('\n').trim()
}

function newLaunches() {
  return catalog.items
    .filter((i) => i.new_launch)
    .map((i) => `- **${i.name}** (${i.sku}) — ₹${i.price_per_unit}/${i.unit}. Naya launch.`)
    .join('\n')
}

function pairingMatrix() {
  const bySku = new Map(catalog.items.map((i) => [i.sku, i]))
  const seen = new Set()
  const lines = []
  for (const item of catalog.items) {
    for (const pairSku of item.pairs_with ?? []) {
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

const md = `# Janata Masala Demo Catalog (generated)

Store: ${catalog.store} | Version: ${catalog.version} | Currency: ${catalog.currency}

## Full inventory by category

${byCategory()}

## New launches (mention proactively once per call)

${newLaunches()}

## Pairing suggestions (max 2 per call, soft offer)

${pairingMatrix()}

## Rules
- Prices and SKUs only from this catalog — never invent
- If customer asks "kya kya hai": give 2–3 examples per category, not full list
- Pairing: one suggestion at a time; accept "nahi" gracefully
`

fs.mkdirSync(path.dirname(outVoiceLab), { recursive: true })
fs.writeFileSync(outVoiceLab, md)
fs.writeFileSync(outApi, md)
fs.copyFileSync(catalogPath, voiceLabCatalog)
console.log('Wrote', outVoiceLab)
console.log('Synced', voiceLabCatalog)
