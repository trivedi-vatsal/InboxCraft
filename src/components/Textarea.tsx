import React from 'react'
import { cx, hasErrorInput } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  errorMessage?: string
  label?: string
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, errorMessage, label, hint, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-900 dark:text-gray-50"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cx(
            'flex min-h-[80px] w-full rounded-lg border px-3 py-2.5 text-sm font-mono',
            'text-slate-900 dark:text-slate-100',
            'border-slate-200 dark:border-slate-800',
            'bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900',
            'placeholder-slate-400 dark:placeholder-slate-500',
            'transition focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? hasErrorInput : '',
            className,
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{hint}</p>
        )}
        {error && errorMessage && (
          <p className="text-sm text-red-500 dark:text-red-400">{errorMessage}</p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
