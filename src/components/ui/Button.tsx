'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'on-photo' | 'text' | 'ghost'
type ButtonSize = 'default' | 'lg' | 'sm' | 'icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-citra-primary text-white hover:bg-citra-primary-hover active:bg-citra-primary-active active:scale-[.97] shadow-sm',
  secondary:
    'bg-citra-surface text-citra-ink border border-citra-border-strong hover:bg-citra-surface-soft active:scale-[.97]',
  'on-photo':
    'bg-white/90 text-citra-ink hover:bg-white active:scale-[.97] backdrop-blur-sm',
  text:
    'bg-transparent text-citra-primary hover:text-citra-primary-hover hover:bg-citra-primary-soft/50',
  ghost:
    'bg-transparent text-citra-body hover:text-citra-ink hover:bg-citra-surface-soft',
}

const sizeStyles: Record<ButtonSize, string> = {
  default: 'min-h-12 px-6 text-[0.9375rem] font-semibold leading-none',
  lg: 'min-h-[52px] px-8 text-[0.9375rem] font-semibold leading-none',
  sm: 'min-h-10 px-4 text-sm font-semibold leading-none',
  icon: 'h-10 w-10',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center rounded-full transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize }
