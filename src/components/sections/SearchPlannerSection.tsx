'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SearchPlannerSectionProps {
  className?: string
}

export default function SearchPlannerSection({ className }: SearchPlannerSectionProps) {
  const router = useRouter()
  const [val, setVal] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (val) {
      router.push(`/cari?q=${encodeURIComponent(val)}`)
    }
  }

  return (
    <section className={cn('relative z-10', className)}>
      <div className="container-page">
        <form onSubmit={handleSearch} className="-mt-12 rounded-xl bg-citra-surface p-4 shadow-search md:-mt-16 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-citra-surface-soft px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-citra-muted" />
              <input
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="Cari destinasi wisata..."
                className="w-full bg-transparent text-sm text-citra-ink placeholder-citra-muted-soft outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-citra-primary text-white hover:bg-citra-primary-hover active:bg-citra-primary-active active:scale-[.97] shadow-sm min-h-12 px-6 text-[0.9375rem] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas cursor-pointer"
            >
              Jelajahi
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
