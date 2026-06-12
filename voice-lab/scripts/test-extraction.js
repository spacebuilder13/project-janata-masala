#!/usr/bin/env node
/**
 * Golden transcript tests for post-call extraction schema + SKU grounding.
 * Requires ANTHROPIC_API_KEY in .env.local for live tests; otherwise validates fixtures only.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import './_load-env.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data/catalog.demo.json'), 'utf8'))
const knownSkus = new Set(catalog.items.map((i) => i.sku))

const GOLDEN = [
  {
    name: 'b2c-english',
    transcript: `Agent: Namaste! Janata Masala se. Aaj kya chahiye?
Customer: 1kg kaju 13mm, 500g elaichi, 2 packets garam masala, 1kg haldi powder
Agent: Kaju 13mm 1kg ₹920, Elaichi 500g ₹340, Garam Masala 2 pkt ₹180, Haldi 1kg ₹120. Total ₹1,560. Confirm?
Customer: Ok send payment link
Agent: Order JM-DEMO-2901. Bill WhatsApp par bhej denge.`,
    expectedSkus: ['JM-KAJU-13MM', 'JM-ELAICHI', 'JM-GARAM-PKT', 'JM-HALDI'],
    expectedTotal: 1560,
  },
  {
    name: 'b2c-hindi',
    transcript: `Agent: Namaste! Boliye kya chahiye?
Customer: ek kilo kaju 13mm, aadha kilo elaichi, do packet garam masala, ek kilo haldi
Agent: Total ₹1560. Confirm karein?
Customer: haan theek hai`,
    expectedSkus: ['JM-KAJU-13MM', 'JM-ELAICHI', 'JM-GARAM-PKT', 'JM-HALDI'],
    expectedTotal: 1560,
  },
  {
    name: 'b2c-gujarati-hinglish',
    transcript: `Agent: Namaste! Janata Masala.
Customer: 1 kg kaju 13mm, 500 gram elaichi, 2 packet garam, 1 kg haldi
Agent: Total 1560 rupees. Confirm?
Customer: ha ok`,
    expectedSkus: ['JM-KAJU-13MM', 'JM-ELAICHI', 'JM-GARAM-PKT', 'JM-HALDI'],
    expectedTotal: 1560,
  },
]

function validateStructured(structured) {
  const errors = []
  if (!structured?.order?.items?.length) errors.push('no items')
  for (const item of structured?.order?.items ?? []) {
    if (!knownSkus.has(item.sku)) errors.push(`unknown sku ${item.sku}`)
  }
  return errors
}

async function runLiveTest(fixture) {
  const base = process.env.PUBLIC_BASE_URL || 'http://localhost:3000'
  const resp = await fetch(`${base}/api/post-call-extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript: fixture.transcript, session_id: `test-${fixture.name}` }),
  })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.error || resp.statusText)

  const errors = validateStructured(data.structured)
  if (!data.validation?.ok) errors.push(...(data.validation?.errors ?? []))

  const total = data.structured?.order?.total
  if (total !== fixture.expectedTotal) {
    errors.push(`total ${total} !== expected ${fixture.expectedTotal}`)
  }

  for (const sku of fixture.expectedSkus) {
    const found = data.structured?.order?.items?.some((i) => i.sku === sku)
    if (!found) errors.push(`missing expected sku ${sku}`)
  }

  return { errors, usage: data.usage }
}

async function main() {
  const mode = process.argv.includes('--live') ? 'live' : 'offline'
  console.log(`test-extraction mode: ${mode}\n`)

  if (mode === 'offline') {
    for (const f of GOLDEN) {
      console.log(`✓ fixture loaded: ${f.name} (${f.expectedSkus.length} SKUs)`)
    }
    console.log('\nRun with --live when vercel dev is up and ANTHROPIC_API_KEY is set.')
    return
  }

  let passed = 0
  for (const f of GOLDEN) {
    try {
      const { errors, usage } = await runLiveTest(f)
      if (errors.length) {
        console.log(`✗ ${f.name}:`, errors.join('; '))
      } else {
        console.log(`✓ ${f.name} — Claude ${usage?.claude?.input_tokens}/${usage?.claude?.output_tokens} tokens`)
        passed++
      }
    } catch (e) {
      console.log(`✗ ${f.name}: ${e.message}`)
    }
  }
  console.log(`\n${passed}/${GOLDEN.length} passed`)
  process.exit(passed === GOLDEN.length ? 0 : 1)
}

main()
