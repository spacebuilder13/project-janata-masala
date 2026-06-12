import fs from 'fs'
import path from 'path'

let loaded = false

function findEnvFile(name: string): string | null {
  let dir = process.cwd()
  for (let i = 0; i < 6; i++) {
    const filePath = path.join(dir, name)
    if (fs.existsSync(filePath)) return filePath
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return null
}

export function loadLocalEnv() {
  if (loaded) return
  loaded = true

  for (const name of ['.env.local', '.env']) {
    const filePath = findEnvFile(name)
    if (!filePath) continue
    for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = val
    }
  }
}
