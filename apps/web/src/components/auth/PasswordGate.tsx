import { useState, type FormEvent, type ReactNode } from 'react'
import GraphPaper from '../sandy/GraphPaper'
import { isAuthed, verifyPassword } from '@/lib/auth'

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authed, setAuthedState] = useState(isAuthed)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  if (authed) return <>{children}</>

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ok = await verifyPassword(value)
    setLoading(false)
    if (ok) {
      setAuthedState(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className="pgate">
      <GraphPaper size={28} />
      <form className="pgate-card" onSubmit={submit}>
        <span className="pgate-eyebrow mono-caps">S&A × Janata Masala</span>
        <h1 className="pgate-title serif">Enter to continue</h1>
        <p className="pgate-sub">
          Private engagement workspace for Spaceships & Atoms × Janata Masala. Enter the access code shared with you.
        </p>
        <input
          className={`pgate-input ${error ? 'pgate-input--err' : ''}`}
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          placeholder="Access code"
          autoFocus
          autoComplete="current-password"
        />
        {error && <p className="pgate-err mono">Incorrect code. Try again.</p>}
        <button className="pgate-btn mono-caps" type="submit" disabled={loading}>
          {loading ? 'Checking…' : 'Enter workspace →'}
        </button>
      </form>
    </div>
  )
}
