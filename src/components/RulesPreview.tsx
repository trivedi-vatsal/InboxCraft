import type { ParsedEmail } from '@/lib/utils'

interface RulesPreviewProps {
  emails: ParsedEmail[]
}

export function RulesPreview({ emails }: RulesPreviewProps) {
  const valid = emails.filter((e) => e.valid)
  const invalid = emails.filter((e) => !e.valid)

  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Rules Preview</h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">{valid.length} valid</span>
          </span>
          {invalid.length > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 dark:bg-red-500" />
              <span className="text-slate-600 dark:text-slate-400">{invalid.length} skipped</span>
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/80">
            <th className="px-6 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Email Address</th>
            <th className="px-6 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Folder</th>
            <th className="px-6 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, i) => (
            <tr
              key={email.raw}
              className={`border-b border-slate-50 dark:border-slate-800/50 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}`}
            >
              <td className="px-6 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">{email.raw}</td>
              <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                {email.valid ? email.alias : '—'}
              </td>
              <td className="px-6 py-3 text-right">
                {!email.valid ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-500/20">
                    <span className="h-1 w-1 rounded-full bg-red-500" />
                    Invalid
                  </span>
                ) : email.isDomainRule ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-400 ring-1 ring-violet-200 dark:ring-violet-500/20">
                    <span className="h-1 w-1 rounded-full bg-violet-500" />
                    Domain
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-500/20">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    Valid
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
