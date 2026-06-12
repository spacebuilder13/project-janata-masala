#!/usr/bin/env node
/** Fail if raw hex colors appear outside wa-kit/tokens.css */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const HEX = /#[0-9A-Fa-f]{3,8}\b/g
const SCAN_DIRS = [
  path.join(root, 'src/wa-kit'),
  path.join(root, 'src/components/explorations/wa'),
]

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, files)
    else if (/\.(tsx?|css)$/.test(name) && !p.endsWith('tokens.css')) files.push(p)
  }
  return files
}

const hits = []
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      if (HEX.test(line)) {
        HEX.lastIndex = 0
        hits.push(`${path.relative(root, file)}:${i + 1}: ${line.trim()}`)
      }
    })
  }
}

if (hits.length) {
  console.error('lint:wa — FAIL (hex outside tokens.css):\n' + hits.join('\n'))
  process.exit(1)
}
console.log('lint:wa — PASS (no hex outside tokens.css)')
