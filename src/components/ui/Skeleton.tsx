import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
  count?: number
  variant?: 'card' | 'text' | 'circle' | 'rect'
}

export function Skeleton({ className, count = 1, variant = 'text' }: SkeletonProps) {
  const variantClasses = {
    card: 'rounded-lg h-64',
    text: 'rounded h-4',
    circle: 'rounded-full h-12 w-12',
    rect: 'rounded-sm h-8',
  }

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={cn(
        'skeleton-shimmer',
        variantClasses[variant],
        className
      )}
      aria-hidden="true"
    />
  ))

  if (count === 1) return skeletons[0]

  return <div className="flex flex-col gap-3">{skeletons}</div>
}
