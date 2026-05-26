import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'nature' | 'culinary' | 'editor' | 'default' | 'overlay'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  nature: 'bg-citra-primary-soft text-citra-primary',
  culinary: 'bg-[#F5E4DA] text-citra-terracotta-hover',
  editor: 'bg-citra-sand-soft text-citra-ink',
  default: 'bg-citra-surface-soft text-citra-body',
  overlay: 'bg-white/92 text-citra-ink backdrop-blur-sm',
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold leading-none',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
