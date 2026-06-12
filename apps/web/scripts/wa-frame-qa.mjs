#!/usr/bin/env node
/**
 * WhatsApp frame interior QA — screenshots + overflow asserts.
 * Requires: npm run preview (or dev) on PORT, playwright installed.
 *
 * Usage: QA_BASE_URL=http://localhost:4173 DEMO_PASSWORD=masala2026 node scripts/wa-frame-qa.mjs
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '../../..')
const SHOTS = path.resolve(REPO_ROOT, 'docs/qa-screenshots')

const BASE = process.env.QA_BASE_URL ?? 'http://localhost:4173'
const PASSWORD = process.env.DEMO_PASSWORD ?? 'masala2026'

const PATTERNS = [
  'list-dump',
  'catalog-carousel',
  'bulk-order-buttons',
  'channels-arrivals',
  'payment-link',
  'crm-segment',
  'order-confirm',
  'festival-list',
  'bundle-essentials',
  'feedback-flow',
  'recipe-tiein',
]

async function login(page) {
  await page.goto(`${BASE}/`)
  await page.getByPlaceholder('Access code').fill(PASSWORD)
  await page.getByRole('button', { name: /enter workspace/i }).click()
  await page.waitForURL(/\/home/)
}

async function main() {
  fs.mkdirSync(SHOTS, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

  let failed = false
  const errors = []

  try {
    await login(page)
    await page.goto(`${BASE}/home/explorations/whatsapp`)
    await page.waitForSelector('.wa-gallery-grid')

    await page.screenshot({ path: path.join(SHOTS, 'v4-whatsapp-gallery-1280.png'), fullPage: true })

    for (const id of PATTERNS) {
      const card = page.locator(`[data-wa-pattern="${id}"]`)
      await card.scrollIntoViewIfNeeded()

      const frame = card.locator('.wa-mini-frame')
      const frameEl = await frame.elementHandle()
      if (!frameEl) {
        errors.push(`${id}: .wa-mini-frame not found`)
        failed = true
        continue
      }

      const overflow = await frameEl.evaluate((el) => ({
        sw: el.scrollWidth,
        cw: el.clientWidth,
      }))
      if (overflow.sw > overflow.cw + 1) {
        errors.push(`${id}: horizontal overflow scrollWidth=${overflow.sw} clientWidth=${overflow.cw}`)
        failed = true
      }

      const composer = frame.locator('.wa-chrome__composer')
      if (!(await composer.isVisible())) {
        errors.push(`${id}: composer not visible`)
        failed = true
      }

      await frame.screenshot({ path: path.join(SHOTS, `v4-frame-${id}.png`) })
    }
  } finally {
    await browser.close()
  }

  if (failed) {
    console.error('qa:wa-frames — FAIL\n' + errors.join('\n'))
    process.exit(1)
  }
  console.log(`qa:wa-frames — PASS (${PATTERNS.length} frames + gallery screenshot)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
