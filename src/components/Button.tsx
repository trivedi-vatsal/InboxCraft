import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { tv, type VariantProps } from 'tailwind-variants'
import { cx, focusRing } from '@/lib/utils'

const buttonVariants = tv({
  base: [
    'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
    'transition-all duration-100 ease-in-out',
    'disabled:pointer-events-none disabled:opacity-50',
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        'bg-blue-500 text-white shadow-sm',
        'hover:bg-blue-600 active:bg-blue-700',
        'dark:bg-blue-500 dark:text-white',
        'dark:hover:bg-blue-600 dark:active:bg-blue-700',
      ],
      secondary: [
        'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300',
        'hover:bg-gray-50 active:bg-gray-100',
        'dark:bg-gray-950 dark:text-gray-50 dark:ring-gray-800',
        'dark:hover:bg-gray-900 dark:active:bg-gray-800',
      ],
      ghost: [
        'text-gray-700',
        'hover:bg-gray-100 hover:text-gray-900',
        'dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50',
      ],
      destructive: [
        'bg-red-500 text-white shadow-sm',
        'hover:bg-red-600 active:bg-red-700',
        'dark:bg-red-700 dark:text-white',
        'dark:hover:bg-red-600 dark:active:bg-red-500',
      ],
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4',
      lg: 'h-10 px-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cx(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
