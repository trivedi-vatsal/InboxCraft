import { Link } from "react-router-dom"
import { RiArrowRightLine } from "@remixicon/react"

export function Cta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto mb-20 mt-32 max-w-6xl p-1 px-4 sm:mt-40 overflow-hidden"
    >
      <div className="relative flex items-center justify-center">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute -z-10 select-none opacity-70 mask-radial"
          aria-hidden="true"
        >
          <div className="flex size-full flex-col gap-2">
            {Array.from({ length: 20 }, (_, idx) => (
              <div key={`outer-${idx}`}>
                <div className="flex size-full gap-2">
                  {Array.from({ length: 41 }, (_, idx2) => (
                    <div key={`inner-${idx}-${idx2}`}>
                      <div className="size-5 rounded-md shadow shadow-indigo-500/20 ring-1 ring-black/5 dark:shadow-indigo-500/20 dark:ring-white/5"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl w-full">
          <div className="flex flex-col items-center justify-center text-center">
            <div>
              <h3
                id="cta-title"
                className="inline-block bg-gradient-to-t from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl font-bold tracking-tighter text-transparent md:text-6xl dark:from-gray-50 dark:to-gray-300"
              >
                Ready to get organised?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600 sm:text-lg dark:text-gray-400">
                Pick a pre-built template for your favourite service, or go advanced to configure every detail.
              </p>
            </div>
            
            {/* Inner card with buttons */}
            <div className="mt-10 w-full rounded-2xl bg-gray-300/5 p-1.5 ring-1 ring-black/[3%] backdrop-blur dark:bg-gray-900/10 dark:ring-white/[3%]">
              <div className="rounded-xl bg-white p-4 shadow-lg shadow-indigo-500/10 ring-1 ring-black/5 dark:bg-gray-950 dark:shadow-indigo-500/10 dark:ring-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/templates"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                  >
                    Browse Templates ✨
                  </Link>
                  <Link
                    to="/advanced"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-8 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    Advanced Mode
                    <RiArrowRightLine className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              Free forever · No account required ·{" "}
              <a
                href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                MIT licensed
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
