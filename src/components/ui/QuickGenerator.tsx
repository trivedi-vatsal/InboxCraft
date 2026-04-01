import { QuickGeneratorCard } from "@/components/home"

export function QuickGenerator() {
  return (
    <section
      id="generator"
      className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-8 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Create a rule in seconds
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400">
            Enter an email and let InboxCraft generate your PowerShell script instantly.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <QuickGeneratorCard />
        </div>
      </div>
    </section>
  )
}
