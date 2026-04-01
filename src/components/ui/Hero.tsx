import { RiArrowRightLine, RiDownloadLine } from "@remixicon/react"
import { Link } from "react-router-dom"
import { Button } from "../Button"
import GameOfLife from "./HeroBackground"

export function Hero() {
  return (
    <section aria-label="hero" className="relative flex flex-col items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden px-4">
      {/* Background Animation */}
      <GameOfLife />

      <div className="z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/50 px-3.5 py-1.5 mb-8 animate-slide-up-fade backdrop-blur-sm"
          style={{ animationDuration: "500ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
            Free · No sign-up · Runs in your browser
          </span>
        </div>

        {/* Headline */}
        <h1
          className="max-w-4xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 dark:from-slate-50 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent leading-[1.1] animate-slide-up-fade"
          style={{ animationDuration: "700ms" }}
        >
          Stop sorting emails manually.
        </h1>
        <h2 
          className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-700 dark:text-slate-300 animate-slide-up-fade"
          style={{ animationDuration: "800ms" }}
        >
          Automate your Outlook inbox rules.
        </h2>

        {/* Sub-headline */}
        <p
          className="mt-6 max-w-xl text-base sm:text-xl text-center text-balance text-slate-500 dark:text-slate-400 leading-relaxed animate-slide-up-fade"
          style={{ animationDuration: "900ms" }}
        >
          Paste sender addresses, choose how to organise them, and InboxCraft
          generates a PowerShell script that creates folders and rules
          automatically - in seconds.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full animate-slide-up-fade"
          style={{ animationDuration: "1100ms" }}
        >
          <Button
            type="button"
            onClick={() =>
              document
                .getElementById("generator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto flex items-center gap-2 h-12 px-6 rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors text-base"
          >
            <RiDownloadLine className="hidden sm:block size-5" />
            <span className="hidden sm:block">Create Rules Free</span>
            <span className="sm:hidden">Get Link for Desktop</span>
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto h-12 px-6 rounded-xl flex items-center gap-2 text-base group"
            asChild
          >
            <Link to="/templates">
              Browse Templates
              <RiArrowRightLine className="size-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Feature pills */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500 dark:text-slate-400 animate-slide-up-fade font-medium"
          style={{ animationDuration: "1300ms" }}
        >
          {[
            { icon: "📂", text: "Nested folder structure" },
            { icon: "⚡", text: "Copy or Move rules" },
            { icon: "🌐", text: "Domain-wide matching" },
            { icon: "🔒", text: "Nothing leaves your browser" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <span className="opacity-80">{icon}</span> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
