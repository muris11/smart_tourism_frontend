import Link from 'next/link'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/Button'

interface NotFoundStateProps {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export default function NotFoundState({
  title = 'Halaman tidak ditemukan',
  description = 'Halaman yang kamu cari tidak tersedia.',
  actionLabel = 'Kembali ke Beranda',
  actionHref = '/',
}: NotFoundStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-citra-surface-soft p-6">
        <Compass className="h-14 w-14 text-citra-muted-soft" />
      </div>
      <h1 className="mb-3 font-display text-2xl font-bold text-citra-ink md:text-3xl">
        {title}
      </h1>
      <p className="mb-8 max-w-md text-sm text-citra-body md:text-base">
        {description}
      </p>
      <Link href={actionHref}>
        <Button variant="primary" size="lg">
          {actionLabel}
        </Button>
      </Link>
    </div>
  )
}
