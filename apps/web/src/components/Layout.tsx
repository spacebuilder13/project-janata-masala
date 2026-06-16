import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import GraphPaper from './sandy/GraphPaper'
import { clearAuth } from '@/lib/auth'

export default function Layout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname.startsWith('/home')

  return (
    <div className="relative min-h-dvh flex flex-col">
      {isHome && <GraphPaper size={28} vignette className="fixed" />}
      {isHome && (
        <header className="jm-topbar">
          <Link to="/home" className="jm-brand">
            <span className="jm-dot" aria-hidden="true" />
            <span className="jm-brand-kicker">S&A × JM</span>
            <span className="jm-brand-text">Janata Masala</span>
          </Link>
          <nav className="jm-nav">
            <Link
              to="/home/mission"
              className={`jm-nav-link${pathname.includes('mission') || pathname.includes('adventure') ? ' jm-nav-link--active' : ''}`}
            >
              Mission
            </Link>
            <Link
              to="/home/explorations"
              className={`jm-nav-link${pathname.includes('explorations') ? ' jm-nav-link--active' : ''}`}
            >
              Explorations
            </Link>
            <button
              type="button"
              className="jm-nav-btn"
              onClick={() => { clearAuth(); window.location.href = '/' }}
            >
              Sign out
            </button>
          </nav>
        </header>
      )}
      <main className="relative z-10 flex-1 flex flex-col min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
