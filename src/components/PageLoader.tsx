export function PageLoader() {
  return (
    <div className="flex flex-1 flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Simulated hero area */}
      <div className="flex flex-col items-center justify-center pt-40 pb-20 px-4 gap-5 animate-pulse">
        <div className="h-4 w-40 rounded-[4px] bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-80 rounded-[4px] bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-64 rounded-[4px] bg-slate-200 dark:bg-slate-800" />
        <div className="mt-2 flex gap-3">
          <div className="h-9 w-36 rounded-[4px] bg-[#533afd]/20 dark:bg-[#533afd]/30" />
          <div className="h-9 w-32 rounded-[4px] bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  )
}
