// ─── Mock Folder Structure ────────────────────────────────────────────────────

const MOCK_FOLDERS = [
  "alex.johnson",
  "maria.garcia",
  "john.doe",
  "sarah.miller",
  "startup.io",
  "azure.com",
  "gcp.com",
];

export function MockFolderStructure() {
  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden text-xs select-none bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/50">
        <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
          Folder Structure Preview
        </span>
        <span className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400">
          5 folders will be created
        </span>
      </div>

      {/* Tree */}
      <div className="px-4 py-3 font-mono space-y-1 text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <span>📥</span>
          <span className="font-medium">Inbox</span>
        </div>
        <div className="flex items-center gap-1.5 pl-4 text-slate-500 dark:text-slate-400">
          <span className="text-slate-300 dark:text-slate-600">└</span>
          <span>📁</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">team</span>
        </div>
        {MOCK_FOLDERS.map((f, i) => (
          <div
            key={f}
            className="flex items-center gap-1.5 pl-8 text-slate-600 dark:text-slate-400"
          >
            <span className="text-slate-300 dark:text-slate-600 text-[10px]">
              {i === MOCK_FOLDERS.length - 1 ? "└" : "├"}
            </span>
            <span>📂</span>
            <span>{f}</span>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/60 dark:bg-slate-900/50">
        <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-relaxed">
          Emails from each sender will be{" "}
          <strong className="text-slate-600 dark:text-slate-300 font-semibold">copied</strong> into
          their folder. Hit{" "}
          <strong className="text-slate-600 dark:text-slate-300 font-semibold">
            Generate Script
          </strong>{" "}
          to create the PowerShell script.
        </p>
      </div>
    </div>
  );
}
