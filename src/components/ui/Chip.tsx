'use client'

import { cn } from '@/lib/utils/cn'
import { X } from 'lucide-react'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  onRemove?: () => void
  className?: string
}

export function Chip({ label, active, onClick, onRemove, className }: ChipProps) {
  const isInteractive = !!onClick

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-180',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas',
        active
          ? 'bg-citra-primary text-white'
          : 'bg-citra-surface text-citra-body hover:bg-citra-surface-soft border border-citra-border',
        !isInteractive && 'cursor-default',
        className
      )}
    >
      {label}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRemove() } }}
          className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 transition-colors"
          aria-label={`Hapus filter ${label}`}
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </button>
  )
}
