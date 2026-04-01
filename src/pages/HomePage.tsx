
import {
  MockOutlookClient,
  MockFolderStructure,
  MockRulesManager,
  MockAdvancedForm,
  MockTerminal,
  MockTemplatesUI,
} from "@/components/home";

import { Hero } from "@/components/ui/Hero";
import { Features } from "@/components/ui/Features";
import { Cta } from "@/components/ui/Cta";
import { QuickGenerator } from "@/components/ui/QuickGenerator";
import { HowItWorks } from "@/components/ui/HowItWorks";

export function HomePage() {
  return (
    <main className="flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden relative">
      
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Interactive Mock Showcase ──────────────────────────────── */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 z-20 animate-slide-up-fade" style={{ animationDuration: "1500ms" }}>
        {/* Glow behind the dashboard */}
        <div className="absolute inset-0 top-20 -z-10 mx-auto h-[300px] w-full max-w-3xl bg-indigo-500/20 dark:bg-indigo-600/30 blur-[100px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_260px] gap-4 items-start rounded-2xl bg-white/40 dark:bg-slate-900/40 p-3 ring-1 ring-slate-200/50 dark:ring-slate-800/50 backdrop-blur-xl shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-900/20">
          
          {/* Left col: Folder tree + Rules manager */}
          <div className="flex flex-col gap-4">
            <MockFolderStructure />
            <MockRulesManager />
          </div>

          {/* Center: Organised inbox (main visual) + Templates Demo */}
          <div className="flex flex-col gap-4">
            <MockOutlookClient />
            <MockTemplatesUI />
          </div>

          {/* Right col: Advanced form + Terminal */}
          <div className="flex flex-col gap-4">
            <MockAdvancedForm />
            <MockTerminal />
          </div>

        </div>

        {/* Fade-out gradient at bottom to blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-30" />
      </section>

      {/* ── Features Grid ────────────────────────────────────────── */}
      <Features />

      {/* ── Quick Generator ──────────────────────────────────────── */}
      <QuickGenerator />

      {/* ── How it works ─────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Call To Action ───────────────────────────────────────── */}
      <Cta />
      
    </main>
  );
}

