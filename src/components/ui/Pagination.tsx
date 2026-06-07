'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 5

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      if (currentPage <= 3) {
        start = 2
        end = Math.min(showPages, totalPages - 1)
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - showPages + 1)
        end = totalPages - 1
      }
      if (start > 2) pages.push('ellipsis')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push('ellipsis')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-full text-citra-muted transition-all hover:bg-citra-surface-soft hover:text-citra-ink disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {getPageNumbers().map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`e-${i}`} className="flex h-10 w-10 items-center justify-center text-sm text-citra-muted-soft">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all',
              page === currentPage
                ? 'bg-citra-primary text-citra-on-primary shadow-sm'
                : 'text-citra-body hover:bg-citra-surface-soft hover:text-citra-ink'
            )}
            aria-label={`Halaman ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full text-citra-muted transition-all hover:bg-citra-surface-soft hover:text-citra-ink disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Halaman selanjutnya"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  )
}
