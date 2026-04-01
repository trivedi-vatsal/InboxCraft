import React from 'react'
import { cx } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'relative w-full rounded-xl border p-6 text-left shadow-sm',
          'bg-white',
          'border-slate-200',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export { Card }
