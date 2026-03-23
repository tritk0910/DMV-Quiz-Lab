import { Link, NavLink, Outlet } from 'react-router-dom'
import { FileClock, House, NotebookPen } from 'lucide-react'
import { cn } from '@renderer/lib/utils'

const links = [
  { to: '/', label: 'Home', icon: House },
  { to: '/quiz', label: 'Practice Test', icon: NotebookPen },
  { to: '/history', label: 'History', icon: FileClock }
]

export function Layout(): React.JSX.Element {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(88,88,88,0.16),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(132,132,132,0.2),transparent_44%),linear-gradient(160deg,#050505_20%,#141414_100%)]" />
      <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="text-lg font-bold tracking-widest text-zinc-200"
          >
            DMV QUIZ LAB
          </Link>
          <nav className="flex items-center gap-2">
            {links.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-zinc-100 text-zinc-900'
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
