/**
 * Pagination - Komponen pagination reusable untuk navigasi halaman
 * 
 * Fitur:
 * - Tombol Previous & Next
 * - Nomor halaman dengan ellipsis untuk halaman yang banyak
 * - Responsive design (ukuran berbeda untuk mobile & desktop)
 * - Active page indicator
 * - Disabled state untuk tombol Previous/Next di ujung
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Halaman aktif saat ini (1-indexed)
 * @param {number} props.totalPages - Total jumlah halaman
 * @param {function} props.onPageChange - Callback saat halaman berubah
 * @param {number} [props.siblingCount=1] - Jumlah sibling page yang ditampilkan di kiri/kanan active page
 * @param {string} [props.size='md'] - Ukuran pagination ('sm', 'md', 'lg')
 * 
 * @returns {JSX.Element} Komponen pagination lengkap
 * 
 * @example
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   onPageChange={(page) => console.log(page)} 
 * />
 */

'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/** Ukuran button pagination */
const sizeStyles = {
    sm: {
        button: 'h-8 w-8 text-xs',
        icon: 'h-3.5 w-3.5',
        gap: 'gap-1',
    },
    md: {
        button: 'h-9 w-9 text-sm',
        icon: 'h-4 w-4',
        gap: 'gap-1.5',
    },
    lg: {
        button: 'h-10 w-10 text-base',
        icon: 'h-5 w-5',
        gap: 'gap-2',
    },
}

interface PaginationProps {
    /** Halaman aktif saat ini (1-indexed) */
    currentPage: number
    /** Total jumlah halaman */
    totalPages: number
    /** Callback saat halaman berubah */
    onPageChange: (page: number) => void
    /** Jumlah sibling page yang ditampilkan di kiri/kanan active page (default: 1) */
    siblingCount?: number
    /** Ukuran pagination (default: 'md') */
    size?: 'sm' | 'md' | 'lg'
}

/**
 * Generate array halaman yang akan ditampilkan dengan ellipsis
 * Contoh: [1, 2, 3, '...', 10] untuk total 10 halaman dengan currentPage 3
 */
const generatePaginationRange = (currentPage: number, totalPages: number, siblingCount: number) => {
    // Halaman pertama dan terakhir selalu ditampilkan
    const firstPage = 1
    const lastPage = totalPages

    // Hitung halaman di kiri dan kanan active page
    const leftSiblingCount = Math.max(currentPage - siblingCount, 1)
    const rightSiblingCount = Math.min(currentPage + siblingCount, totalPages)

    // Apakah perlu menampilkan ellipsis di kiri?
    const showLeftEllipsis = leftSiblingCount > 2
    // Apakah perlu menampilkan ellipsis di kanan?
    const showRightEllipsis = rightSiblingCount < totalPages - 1

    if (!showLeftEllipsis && !showRightEllipsis) {
        // Kasus: total halaman sedikit, tampilkan semua
        const range = []
        for (let i = 1; i <= totalPages; i++) {
            range.push(i)
        }
        return range
    }

    if (showLeftEllipsis && !showRightEllipsis) {
        // Kasus: ellipsis hanya di kiri
        const range = [firstPage, '...']
        for (let i = leftSiblingCount; i <= lastPage; i++) {
            range.push(i)
        }
        return range
    }

    if (!showLeftEllipsis && showRightEllipsis) {
        // Kasus: ellipsis hanya di kanan
        const range = []
        for (let i = firstPage; i <= rightSiblingCount; i++) {
            range.push(i)
        }
        range.push('...', lastPage)
        return range
    }

    // Kasus: ellipsis di kiri dan kanan
    const range = [
        firstPage,
        '...',
        ...Array.from({ length: rightSiblingCount - leftSiblingCount + 1 }, (_, i) => leftSiblingCount + i),
        '...',
        lastPage,
    ]
    return range
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    size = 'md',
}: PaginationProps) {
    // Jangan render jika hanya 1 halaman
    if (totalPages <= 1) return null

    const styles = sizeStyles[size]
    const pages = generatePaginationRange(currentPage, totalPages, siblingCount)

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page)
        }
    }

    return (
        <nav
            className={cn('flex items-center justify-center', styles.gap)}
            aria-label="Pagination navigasi"
        >
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={cn(
                    styles.button,
                    'flex items-center justify-center rounded-lg border border-slate-200 bg-white transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white',
                    size === 'sm' && 'rounded-md'
                )}
                aria-label="Halaman sebelumnya"
            >
                <ChevronLeft className={styles.icon} />
            </button>

            {/* Page Numbers */}
            {pages.map((page, index) => {
                if (page === '...') {
                    return (
                        <div
                            key={`ellipsis-${index}`}
                            className={cn(
                                styles.button,
                                'flex items-center justify-center text-slate-400'
                            )}
                            aria-hidden="true"
                        >
                            <MoreHorizontal className={styles.icon} />
                        </div>
                    )
                }

                const pageNumber = page as number
                const isActive = pageNumber === currentPage

                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={cn(
                            styles.button,
                            'flex items-center justify-center rounded-lg font-medium transition-all',
                            isActive
                                ? 'bg-brand-navy text-white shadow-sm'
                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-brand-navy',
                            size === 'sm' && 'rounded-md'
                        )}
                        aria-label={`Halaman ${pageNumber}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={cn(
                    styles.button,
                    'flex items-center justify-center rounded-lg border border-slate-200 bg-white transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white',
                    size === 'sm' && 'rounded-md'
                )}
                aria-label="Halaman selanjutnya"
            >
                <ChevronRight className={styles.icon} />
            </button>
        </nav>
    )
}