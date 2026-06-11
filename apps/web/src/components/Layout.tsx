import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import GraphPaper from './sandy/GraphPaper'
import { clearAuth } from '@/lib/auth'

export default function Layout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname.startsWith('/home')

  return (
    <div className="relative min-h-dvh">
      {isHome && <GraphPaper size={28} className="fixed" />}
      {isHome && (
        <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-sandy-line)', background: 'color-mix(in oklab, var(--color-sandy-bg) 92%, transparent)' }}>
          <Link to="/home" className="flex items-center gap-3">
            <span className="mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>S&A × JM</span>
            <span className="serif text-lg hidden sm:inline">Janata Masala</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/home/adventure" className="mono text-[10px] hover:opacity-70" style={{ color: pathname.includes('adventure') ? 'var(--color-jm-spice)' : 'var(--color-sandy-ink-faint)' }}>
              Adventure
            </Link>
            <Link to="/home/explorations" className="mono text-[10px] hover:opacity-70" style={{ color: pathname.includes('explorations') ? 'var(--color-jm-spice)' : 'var(--color-sandy-ink-faint)' }}>
              Explorations
            </Link>
            <button
              type="button"
              className="mono text-[10px] hover:opacity-70"
              style={{ color: 'var(--color-sandy-ink-faint)' }}
              onClick={() => { clearAuth(); window.location.href = '/' }}
            >
              Sign out
            </button>
          </nav>
        </header>
      )}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
