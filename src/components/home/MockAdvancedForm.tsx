// ─── Mock Advanced Form ───────────────────────────────────────────────────────

const MOCK_SENDERS = [
  "alex.johnson@company.com",
  "maria.garcia@acme.org",
  "john.doe@example.com",
  "sarah.miller@partner.io",
  "@startup.io",
];

export function MockAdvancedForm() {
  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden text-xs select-none bg-white dark:bg-slate-900">
      {/* Mode toggle */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5">
          <div className="rounded-md px-2.5 py-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            ⚡ Quick
          </div>
          <div className="rounded-md bg-white dark:bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-transparent">
            ≡ Advanced
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2.5">
        {/* M365 email + parent folder */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
              YOUR M365 EMAIL
            </div>
            <div className="rounded-lg border border-indigo-300 dark:border-indigo-500/30 bg-indigo-50/40 dark:bg-indigo-500/10 px-2 py-1.5 text-[10px] text-slate-700 dark:text-slate-300 truncate">
              user@company.com
            </div>
            <div className="mt-1 text-[9px] text-slate-400 dark:text-slate-500">
              Leave blank to auto-detect.
            </div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
              PARENT FOLDER
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-1.5 text-[10px] text-slate-700 dark:text-slate-300">
              team
            </div>
            <div className="mt-1 text-[9px] text-slate-400 dark:text-slate-500">
              Alias folders are nested inside.
            </div>
          </div>
        </div>

        {/* Rule action + match type */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">
              RULE ACTION
            </div>
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
              <div className="flex-1 bg-indigo-600 py-1.5 text-center text-[10px] font-semibold text-white">
                Copy
              </div>
              <div className="flex-1 py-1.5 text-center text-[10px] text-slate-400 dark:text-slate-500">
                Move
              </div>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">
              MATCH TYPE
            </div>
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
              <div className="flex-1 bg-indigo-600 py-1.5 text-center text-[10px] font-semibold text-white">
                Exact email
              </div>
              <div className="flex-1 py-1.5 text-center text-[10px] text-slate-400 dark:text-slate-500">
                Contains
              </div>
            </div>
          </div>
        </div>

        {/* Sender addresses */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              SENDER ADDRESSES
            </div>
            <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />5
              detected
            </span>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2 py-2 font-mono space-y-0.5 text-[10px] text-slate-600 dark:text-slate-400 text-left">
            {MOCK_SENDERS.map((s) => (
              <div
                key={s}
                className={s.startsWith("@") ? "text-indigo-500 dark:text-indigo-400" : ""}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[9px] text-slate-300 dark:text-slate-600">
            Ctrl+Enter to generate
          </span>
          <div className="flex items-center gap-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm transition-colors">
            ✦ Generate Script
          </div>
        </div>
      </div>
    </div>
  );
}
