/**
 * EmptyState - Komponen state kosong untuk menampilkan pesan ketika tidak ada data
 * 
 * Fitur:
 * - Menampilkan icon default (Inbox) atau custom icon
 * - Judul dan deskripsi yang dapat disesuaikan
 * - Optional action button untuk reload atau navigasi
 * - Styling yang konsisten dengan tema aplikasi
 * - Fully customizable dengan className
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title='Tidak ada data'] - Judul pesan state kosong
 * @param {string} [props.description='Belum ada data yang tersedia'] - Deskripsi pesan state kosong
 * @param {React.ReactNode} [props.icon] - Custom icon (jika tidak disediakan, menggunakan icon default Inbox)
 * @param {string} [props.actionLabel] - Label tombol aksi (opsional)
 * @param {function} [props.onAction] - Callback saat tombol aksi diklik
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Komponen empty state
 * 
 * @example
 * // Default empty state
 * <EmptyState />
 * 
 * @example
 * // Dengan custom title dan description
 * <EmptyState 
 *   title="Tidak ada kuliner ditemukan"
 *   description="Coba ubah filter atau kata kunci pencarian Anda"
 * />
 * 
 * @example
 * // Dengan action button
 * <EmptyState 
 *   title="Gagal memuat data"
 *   description="Terjadi kesalahan saat memuat data"
 *   actionLabel="Coba Lagi"
 *   onAction={() => window.location.reload()}
 * />
 * 
 * @example
 * // Dengan custom icon
 * <EmptyState 
 *   title="Keranjang kosong"
 *   description="Belum ada item di keranjang Anda"
 *   icon={<ShoppingCart className="h-10 w-10 text-slate-400" />}
 * />
 */
'use client'

import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/** Interface untuk props EmptyState component */
interface EmptyStateProps {
  /** Judul pesan state kosong (default: 'Tidak ada data') */
  title?: string
  /** Deskripsi pesan state kosong (default: 'Belum ada data yang tersedia') */
  description?: string
  /** Custom icon (default: Inbox) */
  icon?: React.ReactNode
  /** Label tombol aksi (opsional, tidak ditampilkan jika tidak disediakan) */
  actionLabel?: string
  /** Callback saat tombol aksi diklik */
  onAction?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Komponen EmptyState untuk menampilkan keadaan ketika tidak ada data
 * 
 * @param {EmptyStateProps} props - Component props
 * @returns {JSX.Element} Empty state component
 */
export function EmptyState({
  title = 'Tidak ada data',
  description = 'Belum ada data yang tersedia',
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center py-12',
      className
    )}>
      {/* Icon Section */}
      {icon ? (
        // Custom icon jika disediakan
        icon
      ) : (
        // Default icon Inbox dengan background lingkaran
        <div className="mb-4 rounded-full bg-slate-100 p-4">
          <Inbox className="h-10 w-10 text-slate-400" />
        </div>
      )}

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-slate-800">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm text-slate-500">
        {description}
      </p>

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-full bg-brand-navy px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-navy/90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}