import { del, get, list, put } from '@vercel/blob'

export type VoiceRunRecord = {
  session_id: string
  created_at: string
  agent_key: string
  conversation_id?: string | null
  transcript: string
  structured: unknown
  validation: { ok: boolean; errors: string[] }
  usage: Record<string, unknown>
  meta: Record<string, unknown>
  duration_secs?: number
  status: 'done' | 'error' | 'parse_failed'
}

const PREFIX = 'voice-runs/'
const MAX_RUNS = 500

export function isVoiceRunsStoreConfigured(): boolean {
  return !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN)
}

function runPath(sessionId: string): string {
  return `${PREFIX}${sessionId}.json`
}

async function readBlobJson(pathname: string): Promise<VoiceRunRecord | null> {
  const result = await get(pathname, { access: 'private' })
  if (!result || result.statusCode !== 200 || !result.stream) return null

  const text = await new Response(result.stream).text()
  return JSON.parse(text) as VoiceRunRecord
}

export async function saveVoiceRun(run: VoiceRunRecord): Promise<boolean> {
  if (!isVoiceRunsStoreConfigured()) return false

  await put(runPath(run.session_id), JSON.stringify(run), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })

  const { blobs } = await list({ prefix: PREFIX, limit: MAX_RUNS + 50 })
  const runBlobs = blobs.filter((b) => b.pathname.endsWith('.json'))
  if (runBlobs.length > MAX_RUNS) {
    const sorted = [...runBlobs].sort(
      (a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
    )
    const stale = sorted.slice(0, runBlobs.length - MAX_RUNS)
    await Promise.all(stale.map((b) => del(b.url)))
  }

  return true
}

export async function listVoiceRuns(limit = 50): Promise<VoiceRunRecord[]> {
  if (!isVoiceRunsStoreConfigured()) return []

  const { blobs } = await list({ prefix: PREFIX, limit: 200 })
  const runBlobs = blobs
    .filter((b) => b.pathname.endsWith('.json'))
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, limit)

  const runs = await Promise.all(runBlobs.map((b) => readBlobJson(b.pathname)))
  return runs.filter((r): r is VoiceRunRecord => r != null)
}

export async function getVoiceRun(sessionId: string): Promise<VoiceRunRecord | null> {
  return readBlobJson(runPath(sessionId))
}

export async function patchVoiceRunUsage(
  sessionId: string,
  usage: Record<string, unknown>,
): Promise<boolean> {
  const existing = await getVoiceRun(sessionId)
  if (!existing) return false

  const updated: VoiceRunRecord = {
    ...existing,
    usage: { ...existing.usage, ...usage },
  }
  return saveVoiceRun(updated)
}
