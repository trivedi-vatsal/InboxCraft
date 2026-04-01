import { cx } from "@/lib/utils";
import { RiSearchLine } from "@remixicon/react";
import { useTemplates, type TemplateIndex } from "@/hooks/useTemplates";
import { CATEGORIES, CAT_COLOR } from "@/components/TemplateShared";

// ─── Mock Templates UI ────────────────────────────────────────────────────────

function MockTemplateCard({ card }: { card: TemplateIndex }) {
  const colors = CAT_COLOR[card.category] ?? {
    chip: "bg-slate-600 dark:bg-slate-500 text-white",
    badge: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-slate-200 dark:ring-slate-700",
    icon: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
    glow: "",
  };

  return (
    <div className="group relative flex flex-col rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden pointer-events-none">
      <div className="flex items-start gap-2.5 px-3 pt-3 pb-2">
        <div
          className={cx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg shadow-sm",
            colors.icon
          )}
        >
          {card.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">
            {card.name}
          </p>
          <p className="mt-0.5 text-[9px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
            {card.description}
          </p>
        </div>
      </div>
      <div className="mx-3 border-t border-slate-100 dark:border-slate-800" />
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span
          className={cx(
            "inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium ring-1 ring-inset",
            colors.badge
          )}
        >
          {card.category}
        </span>
        <button
          type="button"
          className="rounded-md px-2 py-0.5 text-[9px] font-medium text-white bg-indigo-600 shadow-sm"
        >
          Get Script
        </button>
      </div>
    </div>
  );
}

export function MockTemplatesUI() {
  const { cards } = useTemplates();
  // Filter top 2 cards to perfectly match the height of the blurred bottom fade
  const displayCards = cards.slice(0, 2);

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl dark:shadow-2xl bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-black/5 dark:ring-white/5 relative z-10 hidden sm:block select-none">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-2.5 border-b border-slate-200 dark:border-slate-800">
        <span className="h-2 w-2 rounded-full bg-red-400 dark:bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
        <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
        <div className="ml-3 flex items-center">
          <span className="ml-1 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            InboxCraft / Templates
          </span>
        </div>
      </div>

      {/* App logic (scaled down) */}
      <div className="p-3 sm:p-4 bg-slate-50/50 dark:bg-slate-900/50 text-left">
        <div className="relative mb-3 max-w-2xl">
          <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <div className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-1.5 pl-8 pr-3 text-[10px] text-slate-400 dark:text-slate-500 shadow-sm">
            Search templates...
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-2.5 py-0.5 text-[9px] font-semibold shadow-sm">
            All
          </span>
          {CATEGORIES.slice(1).map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 text-[9px] font-semibold"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5 mb-4 px-1 text-[9px] font-medium text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <span className="text-slate-700 dark:text-slate-300 font-bold text-[10px]">10</span>{" "}
            templates
          </span>
          <span className="h-2.5 w-px bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1">
            <span className="text-slate-700 dark:text-slate-300 font-bold text-[10px]">29</span>{" "}
            sender addresses
          </span>
          <span className="h-2.5 w-px bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1">
            <span className="text-slate-700 dark:text-slate-300 font-bold text-[10px]">6</span>{" "}
            categories
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {displayCards.map((c) => (
            <MockTemplateCard key={c.id} card={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
