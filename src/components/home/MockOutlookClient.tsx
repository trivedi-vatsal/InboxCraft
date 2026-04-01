import { cx } from "@/lib/utils";

// ─── Mock Outlook client (hero visual) ───────────────────────────────────────

const SIDEBAR_FOLDERS = [
  "alex.johnson",
  "maria.garcia",
  "john.doe",
  "startup.io",
];
const MOCK_EMAILS = [
  { subject: "Q2 report attached", time: "9:41 AM", unread: true },
  { subject: "Re: project update", time: "Yesterday", unread: false },
  { subject: "Invoice #1042 for review", time: "Mon", unread: false },
  { subject: "Follow-up on last call", time: "Mar 21", unread: false },
  { subject: "Slides for presentation", time: "Mar 18", unread: false },
  { subject: "Status update for Q3", time: "Mar 15", unread: false },
  { subject: "Candidate review for the role", time: "Mar 10", unread: true },
];

export function MockOutlookClient() {
  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-slate-900/50 overflow-hidden text-xs select-none ring-1 ring-black/5 dark:ring-white/5">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
        <span className="ml-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          Outlook - Inbox
        </span>
      </div>
      <div className="flex h-[400px]">
        {/* Sidebar */}
        <div className="w-44 shrink-0 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 py-3 overflow-hidden">
          <div className="px-3 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              user@company.com
            </span>
          </div>
          {[
            { label: "Inbox", icon: "📥", count: "24" },
            { label: "Sent", icon: "📤" },
            { label: "Drafts", icon: "📝" },
          ].map(({ label, icon, count }) => (
            <div
              key={label}
              className="flex items-center justify-between px-3 py-1.5 text-slate-600 dark:text-slate-300"
            >
              <span className="flex items-center gap-2">
                <span>{icon}</span>
                <span>{label}</span>
              </span>
              {count && (
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  {count}
                </span>
              )}
            </div>
          ))}
          <div className="mt-2 px-3 py-1 text-slate-400 dark:text-slate-500 text-[10px] font-semibold uppercase tracking-wider">
            Organised
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-slate-700 dark:text-slate-300">
            <span className="text-slate-400 dark:text-slate-500">▾</span>
            <span>📁</span>
            <span className="font-medium text-indigo-600 dark:text-indigo-400">team</span>
          </div>
          {SIDEBAR_FOLDERS.map((alias, i) => (
            <div
              key={alias}
              className={cx(
                "flex items-center gap-2 pl-7 pr-3 py-1",
                i === 1
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <span className="text-slate-300 dark:text-slate-600 text-[10px]">
                {i === 3 ? "└" : "├"}
              </span>
              <span>📂</span>
              <span className="truncate">{alias}</span>
            </div>
          ))}
        </div>
        {/* Email list */}
        <div className="flex-1 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            maria.garcia
          </div>
          {MOCK_EMAILS.map(({ subject, time, unread }) => (
            <div
              key={subject}
              className={cx(
                "flex items-start gap-2.5 px-3 py-2.5 border-b border-slate-50 dark:border-slate-800/50",
                unread ? "bg-indigo-50/60 dark:bg-indigo-500/10" : ""
              )}
            >
              <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cx(
                      "truncate",
                      unread ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-600 dark:text-slate-400"
                    )}
                  >
                    maria.garcia@acme.org
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                    {time}
                  </span>
                </div>
                <div
                  className={cx(
                    "truncate mt-0.5 text-left",
                    unread ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {subject}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
