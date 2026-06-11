import { useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import GraphPaper from '../sandy/GraphPaper'
import LivingLines from '../sandy/LivingLines'
import { fadeRise } from '../sandy/motion'
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
    <div className="relative min-h-dvh flex items-center justify-center p-6 overflow-hidden">
      <GraphPaper size={28} />
      <div className="absolute inset-0 opacity-40">
        <LivingLines />
      </div>

      <motion.form
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border"
        style={{
          background: 'var(--color-sandy-surface)',
          borderColor: 'var(--color-sandy-line)',
          boxShadow: 'var(--shadow-card)',
        }}
        onSubmit={submit}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.span variants={fadeRise} className="mono block" style={{ color: 'var(--color-jm-spice)' }}>
          S&A × Janata Masala
        </motion.span>
        <motion.h1 variants={fadeRise} className="serif text-4xl mt-3" style={{ color: 'var(--color-sandy-ink)' }}>
          Spaceships & Atoms
        </motion.h1>
        <motion.p variants={fadeRise} className="serif text-2xl mt-1" style={{ color: 'var(--color-jm-spice)' }}>
          Janata Masala
        </motion.p>
        <motion.p variants={fadeRise} className="mt-4 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Private engagement workspace. Enter the access code shared with you.
        </motion.p>
        <motion.input
          variants={fadeRise}
          className="mt-6 w-full px-4 py-3 rounded-xl border mono text-sm outline-none transition-colors"
          style={{
            borderColor: error ? 'var(--color-jm-spice)' : 'var(--color-sandy-line)',
            background: 'var(--color-sandy-elevated)',
          }}
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          placeholder="Access code"
          autoFocus
          autoComplete="current-password"
        />
        {error && (
          <motion.p variants={fadeRise} className="mt-2 mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>
            Incorrect code. Try again.
          </motion.p>
        )}
        <motion.button
          variants={fadeRise}
          className="mt-6 w-full py-3 rounded-xl mono text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: 'var(--color-sandy-ink)', color: 'var(--color-sandy-bg)' }}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Checking…' : 'Enter workspace →'}
        </motion.button>
      </motion.form>
    </div>
  )
}
