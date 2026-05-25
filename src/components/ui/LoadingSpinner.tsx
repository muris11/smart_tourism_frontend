/**
 * LoadingSpinner - Komponen spinner loading untuk indikator proses
 * 
 * Fitur:
 * - Animasi spin yang halus
 * - 3 ukuran: sm, md, lg
 * - Warna menggunakan brand-green (sesuai tema aplikasi)
 * - Border transparan di sisi kanan, bawah, kiri (hanya sisi atas berwarna)
 * - Customizable dengan className tambahan
 * 
 * @component
 * @param {Object} props - Component props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Ukuran spinner
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Komponen loading spinner
 * 
 * @example
 * // Default size (md)
 * <LoadingSpinner />
 * 
 * @example
 * // Small size untuk tombol
 * <LoadingSpinner size="sm" />
 * 
 * @example
 * // Large size untuk halaman
 * <LoadingSpinner size="lg" className="mx-auto" />
 */
'use client'

import { cn } from '@/lib/utils/cn'

/** Interface untuk props LoadingSpinner component */
interface LoadingSpinnerProps {
    /** Ukuran spinner (default: 'md') */
    size?: 'sm' | 'md' | 'lg'
    /** Additional CSS classes */
    className?: string
}

/**
 * Komponen LoadingSpinner untuk menampilkan indikator loading
 * 
 * @param {LoadingSpinnerProps} props - Component props
 * @returns {JSX.Element} Loading spinner component
 */
export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
    /** Mapping class CSS untuk setiap ukuran spinner */
    const sizeClasses = {
        /** Ukuran kecil - untuk tombol atau inline loading */
        sm: 'h-4 w-4 border-2',
        /** Ukuran sedang - default, untuk area loading biasa */
        md: 'h-8 w-8 border-3',
        /** Ukuran besar - untuk full page loading atau halaman penuh */
        lg: 'h-12 w-12 border-4',
    }

    return (
        <div
            className={cn(
                // Animasi spin dengan rounded penuh
                'animate-spin rounded-full',
                // Sisi atas berwarna brand-green, sisi lainnya transparan
                'border-t-brand-green border-r-transparent border-b-transparent border-l-transparent',
                // Ukuran spinner
                sizeClasses[size],
                // Custom classes tambahan
                className
            )}
            role="status"
            aria-label="Memuat..."
        />
    )
}