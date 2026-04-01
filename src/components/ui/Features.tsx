import React from "react"
import { Badge } from "../Badge"
import { FEATURES } from "@/components/home"

export function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="mx-auto mt-32 w-full max-w-6xl px-4 sm:px-8"
    >
      <div className="flex flex-col items-start">
        <Badge variant="success">Zero Setup Required</Badge>
        <h2
          id="features-title"
          className="mt-4 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl dark:from-gray-50 dark:to-gray-300"
        >
          Instant automation for Outlook
        </h2>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        InboxCraft generates idempotent PowerShell scripts that work natively with
        Outlook COM and Exchange Online - no cloud, no accounts, and no data
        sent anywhere. Local script execution means guaranteed privacy.
      </p>
      <dl className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:border-y md:border-gray-200 md:py-16 dark:border-gray-800">
        {FEATURES.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="border-l-2 border-indigo-100 pl-6 md:border-l md:text-center lg:border-gray-200 lg:first:border-none dark:border-indigo-900 lg:dark:border-gray-800 transition-colors">
              <dd className="inline-block bg-gradient-to-b from-indigo-900 to-indigo-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent lg:text-6xl dark:from-indigo-400 dark:to-indigo-300">
                {stat.value}
              </dd>
              <dt className="mt-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {stat.label}
              </dt>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-[200px] md:mx-auto leading-relaxed text-balance">
                {stat.sub}
              </p>
            </div>
          </React.Fragment>
        ))}
      </dl>
    </section>
  )
}
