import { RiAddLine, RiSubtractLine } from "@remixicon/react";

const faqs = [
  {
    question: "Is it safe to run this script?",
    answer:
      "Yes. The generated snippet uses native ExchangeOnlineManagement and Outlook COM modules provided by Microsoft. It does not download or install any external malware. The script simply automates the repetitive UI clicks you would normally do to create rules.",
  },
  {
    question: "Do I need admin rights?",
    answer:
      "No. Creating and managing your own inbox rules only requires standard user privileges to your own directory/mailbox.",
  },
  {
    question: "Can I read the code before running it?",
    answer:
      "Absolutely. Our built-in syntax highlighter lets you preview exactly what the PowerShell snippet will do before you copy it. You are encouraged to review it.",
  },
];

export function Faq() {
  return (
    <section className="w-full max-w-3xl mx-auto py-12">
      <div className="w-full">
        <div className="text-center mb-12 animate-slide-up-fade">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Everything you need to know about safety, privacy, and running the script.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden animate-slide-up-fade"
              style={{ animationDuration: `${500 + index * 100}ms` }}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 dark:text-slate-50 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
                <span className="text-lg">{faq.question}</span>
                <span className="relative size-5 shrink-0 ml-4 flex items-center justify-center text-slate-400 group-open:text-indigo-600 dark:group-open:text-indigo-400 transition-colors">
                  <RiAddLine className="absolute size-5 transition-opacity group-open:opacity-0" />
                  <RiSubtractLine className="absolute size-5 opacity-0 transition-opacity group-open:opacity-100" />
                </span>
              </summary>
              <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed opacity-0 transition-opacity duration-300 group-open:opacity-100">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
