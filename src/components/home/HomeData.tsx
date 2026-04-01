import {
  RiClipboardLine,
  RiFileCodeLine,
  RiTerminalLine,
} from "@remixicon/react";

// ─── How it works ─────────────────────────────────────────────────────────────

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Paste sender emails",
    desc: "Add addresses one per line, comma-separated, or drop a .csv. Use @domain.com for domain-wide rules.",
    Icon: RiClipboardLine,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-500 dark:text-blue-400",
    ringColor: "ring-blue-100 dark:ring-blue-500/20",
  },
  {
    step: "2",
    title: "Generate the script",
    desc: "Hit Generate Script (or Ctrl+Enter). InboxCraft builds a ready-to-run PowerShell file instantly - nothing leaves your browser.",
    Icon: RiFileCodeLine,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-500 dark:text-violet-400",
    ringColor: "ring-violet-100 dark:ring-violet-500/20",
  },
  {
    step: "3",
    title: "Run in PowerShell",
    desc: "Open PowerShell, run the file, and sign in to Exchange Online once. Folders and rules are created automatically.",
    Icon: RiTerminalLine,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    ringColor: "ring-emerald-100 dark:ring-emerald-500/20",
  },
];

// ─── Features stats ───────────────────────────────────────────────────────────

export const FEATURES = [
  {
    value: "0",
    label: "Lines of code to write",
    sub: "No scripting knowledge needed",
  },
  {
    value: "10+",
    label: "Ready-made templates",
    sub: "GitHub, Slack, Teams, AWS and more",
  },
  {
    value: "100%",
    label: "Runs in your browser",
    sub: "Nothing is uploaded or stored",
  },
];
