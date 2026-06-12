import fs from 'fs'
import path from 'path'

const LEDGER_HEADERS = [
  'timestamp_utc',
  'session_id',
  'duration_s',
  'el_credits',
  'claude_input_tokens',
  'claude_output_tokens',
  'claude_cost_usd',
  'schema_ok',
  'outcome_score',
]

function csvEscape(v: unknown): string {
  const str = String(v ?? '')
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`
  return str
}

export function writeRunArtifacts(opts: {
  sessionId: string
  transcript: string
  structured: unknown
  validation: { ok: boolean; errors: string[] }
  usage: unknown
  meta: Record<string, unknown>
}) {
  const root = path.join(process.cwd(), 'outputs', 'runs', opts.sessionId)
  fs.mkdirSync(root, { recursive: true })
  fs.writeFileSync(path.join(root, 'transcript.txt'), opts.transcript, 'utf8')
  fs.writeFileSync(
    path.join(root, 'structured.json'),
    JSON.stringify({ structured: opts.structured, validation: opts.validation }, null, 2),
    'utf8',
  )
  fs.writeFileSync(path.join(root, 'usage.json'), JSON.stringify(opts.usage, null, 2), 'utf8')
  fs.writeFileSync(path.join(root, 'meta.json'), JSON.stringify(opts.meta, null, 2), 'utf8')
}

export function appendLedger(row: Record<string, unknown>) {
  const dir = path.join(process.cwd(), 'outputs', 'analytics')
  fs.mkdirSync(dir, { recursive: true })
  const file = path.join(dir, 'session_ledger.csv')
  const hasFile = fs.existsSync(file)
  const values = LEDGER_HEADERS.map((h) => csvEscape(row[h]))
  const line = `${values.join(',')}\n`
  if (!hasFile) {
    fs.writeFileSync(file, `${LEDGER_HEADERS.join(',')}\n${line}`, 'utf8')
  } else {
    fs.appendFileSync(file, line, 'utf8')
  }
}
