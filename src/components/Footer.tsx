import { Link } from 'react-router-dom'
import { RiArrowRightUpLine, RiGithubLine } from '@remixicon/react'

const LOGO_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%234f46e5'/%3E%3Crect x='4' y='10' width='24' height='16' rx='2' fill='white' opacity='0.95'/%3E%3Cpath d='M4 12 L16 20 L28 12 L28 10 L4 10 Z' fill='%234f46e5'/%3E%3C/svg%3E"

const navigation = {
  tool: [
    { name: 'Generator',     to: '/',           external: false },
    { name: 'Advanced',      to: '/advanced',   external: false },
    { name: 'Templates ✨',  to: '/templates',  external: false },
    { name: 'Privacy Policy',to: '/privacy',    external: false },
    { name: 'Changelog',     to: '/changelog',  external: false },
  ],
  resources: [
    { name: 'Documentation',   href: 'https://github.com/trivedi-vatsal/InboxCraft#readme', external: true },
    { name: 'Contributing',    href: 'https://github.com/trivedi-vatsal/InboxCraft/blob/main/CONTRIBUTING.md', external: true },
    { name: 'Report an Issue', href: 'https://github.com/trivedi-vatsal/InboxCraft/issues', external: true },
    { name: 'Source Code',     href: 'https://github.com/trivedi-vatsal/InboxCraft', external: true },
    { name: 'llms.txt',        href: '/InboxCraft/llms.txt', external: true },
  ],
  powershell: [
    { name: 'Exchange Online',  href: 'https://learn.microsoft.com/en-us/powershell/exchange/connect-to-exchange-online-powershell', external: true },
    { name: 'Outlook COM Rules', href: 'https://learn.microsoft.com/en-us/office/vba/api/outlook.rules', external: true },
    { name: 'New-InboxRule',    href: 'https://learn.microsoft.com/en-us/powershell/module/exchange/new-inboxrule', external: true },
  ],
}

function ExtIcon() {
  return (
    <div className="ml-1 aspect-square size-3 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-px">
      <RiArrowRightUpLine aria-hidden className="size-full text-slate-500 dark:text-slate-400" />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
        {/* ── Main content ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 pt-16 lg:pt-20">
        <div className="xl:grid xl:grid-cols-[280px_1fr] xl:gap-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <img src={LOGO_SVG} alt="InboxCraft" className="h-8 w-8" />
              <span className="text-base font-semibold text-slate-900 dark:text-slate-50">InboxCraft</span>
            </div>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 max-w-xs">
              Generate PowerShell scripts to automate Outlook inbox rules - no code, no server, no sign-up required.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/trivedi-vatsal/InboxCraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                aria-label="GitHub"
              >
                <RiGithubLine className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:mt-0">

            {/* Tool */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Tool</h3>
              <ul className="mt-5 space-y-3.5">
                {navigation.tool.map(({ name, to }) => (
                  <li key={to} className="w-fit">
                    <Link
                      to={to}
                      className="flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Resources</h3>
              <ul className="mt-5 space-y-3.5">
                {navigation.resources.map(({ name, href }) => (
                  <li key={href} className="w-fit">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      {name}
                      <ExtIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* PowerShell Docs */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">PowerShell</h3>
              <ul className="mt-5 space-y-3.5">
                {navigation.powershell.map(({ name, href }) => (
                  <li key={href} className="w-fit">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      {name}
                      <ExtIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-8 sm:flex-row sm:items-center lg:mt-20">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} InboxCraft · Built by{' '}
            <a
              href="https://vatsal.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 transition-colors"
            >
              Vatsal Trivedi
            </a>
            {' · '}
            <a
              href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 transition-colors"
            >
              v0.9.0
            </a>
            {' · '}
            <a
              href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 transition-colors"
            >
              MIT
            </a>
          </p>

          <div className="rounded-full border border-slate-200 py-1 pl-1 pr-3">
            <div className="flex items-center gap-1.5">
              <div className="relative size-4 shrink-0">
                <div className="absolute inset-[2px] rounded-full bg-emerald-500/20" />
                <div className="absolute inset-1 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 transition-colors">Runs in your browser</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
