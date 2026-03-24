import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { FileClock, House, MoonStar, NotebookPen, Sun } from 'lucide-react'
import { cn } from '@renderer/lib/utils'

const links = [
  { to: '/', label: 'Home', icon: House },
  { to: '/quiz', label: 'Practice Test', icon: NotebookPen },
  { to: '/history', label: 'History', icon: FileClock }
]

type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'dmv-quiz-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export function Layout(): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = (): void => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden',
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-100 text-zinc-900'
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isDark
            ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(88,88,88,0.16),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(132,132,132,0.2),transparent_44%),linear-gradient(160deg,#050505_20%,#141414_100%)]'
            : 'bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.16),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(14,116,144,0.12),transparent_44%),linear-gradient(160deg,#f5f5f4_20%,#e7e5e4_100%)]'
        )}
      />
      <header
        className={cn(
          'sticky top-0 z-20 border-b backdrop-blur',
          isDark
            ? 'border-zinc-800/80 bg-zinc-950/80'
            : 'border-zinc-300/80 bg-stone-100/80'
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className={cn(
              'text-lg font-bold tracking-widest',
              isDark ? 'text-zinc-200' : 'text-zinc-800'
            )}
          >
            DMV QUIZ LAB
          </Link>
          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors',
                isDark
                  ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100'
              )}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {isDark ? 'Light' : 'Dark'} mode
              </span>
            </button>
            {links.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
                      isDark
                        ? isActive
                          ? 'bg-zinc-100 text-zinc-900'
                          : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100'
                        : isActive
                          ? 'bg-zinc-900 text-zinc-100'
                          : 'text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900'
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
