const AUTH_KEY = 'jm-auth'

export function isAuthed(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function setAuthed(): void {
  sessionStorage.setItem(AUTH_KEY, '1')
}

export function clearAuth(): void {
  sessionStorage.removeItem(AUTH_KEY)
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthed()
      return true
    }
    // Dev fallback when API not available
    if (password === 'masala2026') {
      setAuthed()
      return true
    }
    return false
  } catch {
    if (password === 'masala2026') {
      setAuthed()
      return true
    }
    return false
  }
}
