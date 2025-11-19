import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-verde-600 text-white',
      secondary: 'bg-gray-200 text-gray-800',
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center min-w-[20px] h-5 px-2 text-xs font-semibold rounded-full',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
