import React from "react"
import { cx } from "@/lib/utils"
import { HOW_IT_WORKS } from "@/components/home/HomeData"

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">How it works</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Four simple steps to a cleaner inbox.</p>
          </div>
          <span className="mt-4 sm:mt-0 flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Takes under 2 minutes
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_28px_1fr_28px_1fr] items-stretch gap-4 sm:gap-0">
          {HOW_IT_WORKS.map(
            (
              { step, title, desc, Icon, iconBg, iconColor, ringColor },
              i
            ) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center text-center px-6 py-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 h-full group relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative mb-6 shrink-0">
                    <div
                      className={cx(
                        "flex h-16 w-16 items-center justify-center rounded-2xl ring-4 transition-transform group-hover:scale-110",
                        iconBg,
                        ringColor,
                        "dark:ring-opacity-20"
                      )}
                    >
                      <Icon className={cx("h-8 w-8", iconColor)} />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-balance">
                    {desc}
                  </p>
                </div>
                {i < 2 && (
                  <div
                    className="hidden sm:flex items-center justify-center self-center pointer-events-none"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-slate-300 dark:text-slate-700"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </section>
  )
}
