import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
  size?: 'sm' | 'md'
}

const variants = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700',
  info: 'bg-blue-100 text-blue-700',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export default function Badge({ label, variant = 'default', size = 'sm' }: BadgeProps) {
  return <span className={cn('inline-flex items-center rounded-full font-medium', variants[variant], sizes[size])}>{label}</span>
}
