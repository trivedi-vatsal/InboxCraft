import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { RiDownloadLine } from "@remixicon/react";
import { parseEmails } from "@/lib/utils";
import { generateScript } from "@/lib/powershell";

// ─── Quick generator (embedded) ───────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export function QuickGeneratorCard() {
  const [userEmail, setUserEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const valid = EMAIL_RE.test(senderEmail.trim());

  const handleDownload = useCallback(() => {
    if (!valid) return;
    const parsed = parseEmails(senderEmail);
    const validParsed = parsed.filter((e) => e.valid);
    if (!validParsed.length) return;
    const domain = validParsed[0].domain.split(".")[0] || validParsed[0].alias;
    const ps1 = generateScript(
      validParsed,
      userEmail,
      domain,
      "copy",
      "senderEmail"
    );
    const blob = new Blob([ps1], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
      href: url,
      download: "outlook-rules.ps1",
    }).click();
    URL.revokeObjectURL(url);
  }, [senderEmail, userEmail, valid]);

  const inputCls =
    "block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition focus:border-indigo-400 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50";

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 dark:shadow-none p-6 sm:p-8 ring-1 ring-black/[2%] dark:ring-white/[2%] backdrop-blur-md">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="hq-user-email"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Your M365 Email
          </label>
          <input
            id="hq-user-email"
            type="email"
            autoComplete="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
          />
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Used for folder paths in the script. Leave blank to auto-detect.
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="hq-sender-email"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Sender Email
          </label>
          <input
            id="hq-sender-email"
            type="email"
            autoComplete="off"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="noreply@github.com"
            className={inputCls}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) handleDownload();
            }}
          />
          <p className="text-xs text-slate-400 dark:text-slate-500">
            The address you want to create a rule for.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-400 dark:text-slate-500 pt-1">
          <span>📂 Inbox subfolder</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>📋 Copy</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>🎯 Exact match</span>
        </div>

        <button
          onClick={handleDownload}
          disabled={!valid}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <RiDownloadLine className="size-4" />
          Download Rules
        </button>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          Need more options?{" "}
          <Link
            to="/advanced"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline underline-offset-2"
          >
            Try Advanced mode →
          </Link>
        </p>
      </div>
    </div>
  );
}
