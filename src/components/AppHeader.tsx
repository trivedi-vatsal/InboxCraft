import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { RiCloseLine, RiGithubLine, RiMenuLine, RiMoonLine, RiSunLine } from '@remixicon/react'
import { useTheme } from 'next-themes'
import { cx } from '@/lib/utils'

const LOGO_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%234f46e5'/%3E%3Crect x='4' y='10' width='24' height='16' rx='2' fill='white' opacity='0.95'/%3E%3Cpath d='M4 12 L16 20 L28 12 L28 10 L4 10 Z' fill='%234f46e5'/%3E%3C/svg%3E"

const NAV_LINKS = [
  { to: '/',          label: 'Generator',    end: true  },
  { to: '/advanced',  label: 'Advanced',     end: false },
  { to: '/templates', label: 'Templates ✨', end: false },
]

export function AppHeader() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu at >= 768px
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = () => { if (mq.matches) setMenuOpen(false) }
    mq.addEventListener('change', handler)
    handler()
    return () => mq.removeEventListener('change', handler)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cx(
        'fixed inset-x-3 sm:inset-x-6 top-4 z-50 mx-auto flex max-w-5xl flex-col animate-slide-down-fade overflow-hidden rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)]',
        menuOpen ? 'max-h-[400px]' : 'max-h-[58px]',
        solid
          ? 'backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 shadow-lg shadow-black/[0.04]'
          : 'border-transparent bg-white/0 dark:bg-slate-900/0',
      )}
      style={{ animationDuration: '400ms' }}
    >
      <div className="flex items-center justify-between px-4 py-3 shrink-0 h-[56px] w-full">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0 z-10">
          <img src={LOGO_SVG} alt="InboxCraft" className="h-7 w-7" />
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
            InboxCraft
          </span>
        </NavLink>

        {/* Desktop nav - absolute centered */}
        <nav className="hidden md:absolute md:left-1/2 md:top-[28px] md:block md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => cx(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100',
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2 shrink-0 z-10">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
            </button>
          )}
          <a
            href="https://github.com/trivedi-vatsal/InboxCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="GitHub"
          >
            <RiGithubLine className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1 z-10">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <RiSunLine className="h-5 w-5" /> : <RiMoonLine className="h-5 w-5" />}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-lg p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
          >
            {menuOpen ? <RiCloseLine className="h-5 w-5" /> : <RiMenuLine className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile expanded menu */}
      <div
        className={cx(
          "w-full px-4 pb-4 md:hidden flex-col transition-opacity duration-300",
          menuOpen ? "opacity-100 flex" : "opacity-0 hidden"
        )}
      >
        <div className="h-px w-full bg-slate-100 dark:bg-slate-800/60 mb-3" />
        <nav>
          <ul className="space-y-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => cx(
                    'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100',
                  )}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/60">
              <a
                href="https://github.com/trivedi-vatsal/InboxCraft"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <RiGithubLine className="h-4 w-4" />
                GitHub Repository
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
