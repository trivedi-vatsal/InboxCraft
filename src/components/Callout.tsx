import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cx } from '@/lib/utils'

const calloutVariants = tv({
  base: 'flex items-start gap-2.5 rounded-md p-4 text-sm',
  variants: {
    variant: {
      default: [
        'bg-blue-50 text-blue-700',
        'dark:bg-blue-950 dark:text-blue-400',
      ],
      success: [
        'bg-emerald-50 text-emerald-700',
        'dark:bg-emerald-950 dark:text-emerald-400',
      ],
      error: [
        'bg-red-50 text-red-700',
        'dark:bg-red-950 dark:text-red-400',
      ],
      warning: [
        'bg-yellow-50 text-yellow-700',
        'dark:bg-yellow-950 dark:text-yellow-400',
      ],
      neutral: [
        'bg-gray-100 text-gray-700',
        'dark:bg-gray-800 dark:text-gray-300',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
  icon?: React.ElementType
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, title, icon: Icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(calloutVariants({ variant }), className)}
        {...props}
      >
        {Icon && <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
        <div>
          {title && <p className="font-semibold">{title}</p>}
          {children && <div className="mt-0.5">{children}</div>}
        </div>
      </div>
    )
  },
)

Callout.displayName = 'Callout'

export { Callout }
