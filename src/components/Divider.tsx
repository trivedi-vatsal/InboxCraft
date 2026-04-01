import React from 'react'
import { cx } from '@/lib/utils'

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'mx-auto my-6 flex w-full items-center justify-between gap-3',
          className,
        )}
        {...props}
      >
        <div
          className={cx(
            'h-[1px] w-full',
            'bg-gray-200 dark:bg-gray-800',
          )}
        />
        {children ? (
          <p
            className={cx(
              'whitespace-nowrap text-sm font-medium',
              'text-gray-500 dark:text-gray-500',
            )}
          >
            {children}
          </p>
        ) : null}
        {children ? (
          <div
            className={cx(
              'h-[1px] w-full',
              'bg-gray-200 dark:bg-gray-800',
            )}
          />
        ) : null}
      </div>
    )
  },
)

Divider.displayName = 'Divider'

export { Divider }
