/**
 * Skeleton - Komponen loading skeleton untuk menampilkan placeholder saat data sedang dimuat
 * 
 * Fitur:
 * - Mendukung 3 varian: card, text, circle
 * - Bisa menampilkan multiple skeleton dengan prop count
 * - Animasi pulse yang halus
 * - Customizable dengan className tambahan
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes untuk kustomisasi
 * @param {number} [props.count=1] - Jumlah skeleton yang akan ditampilkan
 * @param {'card' | 'text' | 'circle'} [props.variant='text'] - Varian tampilan skeleton
 * 
 * @returns {JSX.Element} Komponen loading skeleton
 * 
 * @example
 * // Single text skeleton
 * <Skeleton variant="text" />
 * 
 * @example
 * // Multiple card skeletons
 * <Skeleton variant="card" count={3} className="w-full" />
 * 
 * @example
 * // Avatar circle skeleton
 * <Skeleton variant="circle" className="h-16 w-16" />
 */
'use client'

import { cn } from '@/lib/utils/cn'

/** Interface untuk props Skeleton component */
interface SkeletonProps {
  /** Additional CSS classes untuk kustomisasi */
  className?: string
  /** Jumlah skeleton yang akan ditampilkan (default: 1) */
  count?: number
  /** Varian tampilan skeleton (default: 'text') */
  variant?: 'card' | 'text' | 'circle'
}

/**
 * Komponen Skeleton untuk menampilkan placeholder loading
 * 
 * @param {SkeletonProps} props - Component props
 * @returns {JSX.Element} Skeleton component
 */
export function Skeleton({ className, count = 1, variant = 'text' }: SkeletonProps) {
  /** Mapping class CSS untuk setiap varian skeleton */
  const variantClasses = {
    /** Varian card: bentuk persegi dengan border radius besar dan tinggi tetap */
    card: 'rounded-2xl h-64',
    /** Varian text: bentuk persegi panjang pendek untuk teks */
    text: 'rounded h-4',
    /** Varian circle: bentuk lingkaran untuk avatar atau icon */
    circle: 'rounded-full h-12 w-12',
  }

  /** Generate array skeleton berdasarkan jumlah count */
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={cn(
        'animate-pulse bg-slate-200',
        variantClasses[variant],
        className
      )}
      aria-hidden="true"  // Sembunyikan dari screen reader
    />
  ))

  // Jika hanya 1 skeleton, return langsung tanpa wrapper
  if (count === 1) return skeletons[0]

  // Jika multiple skeleton, wrap dalam flex column dengan gap
  return <div className="flex flex-col gap-3">{skeletons}</div>
}