import { Mountain } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000"
          alt="Pemandangan Ciayumajakuning"
          fill
          sizes="(max-width: 1024px) 0px, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute left-12 top-12 z-10">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Kembali</span>
          </Link>
        </div>

        <div className="flex h-full flex-col items-center justify-center px-16 text-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Mountain className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-display text-6xl font-bold tracking-tight text-white">CITRA</h1>
          <p className="mt-4 max-w-sm text-lg text-white/70">
            Jelajahi Pesona Ciayumajakuning
          </p>

          <div className="mt-16 flex gap-6">
            <div className="h-3 w-3 rounded-full bg-citra-sand/40" />
            <div className="h-3 w-16 rounded-full bg-citra-sand/60" />
            <div className="h-3 w-8 rounded-full bg-citra-sand/30" />
          </div>

          <div className="mt-6 flex gap-4">
            <div className="h-16 w-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm" />
            <div className="h-16 w-24 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm" />
            <div className="h-16 w-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-citra-canvas lg:w-1/2">
        <div className="w-full max-w-md px-6 py-8">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-citra-primary-soft">
              <Mountain className="h-4 w-4 text-citra-primary" />
            </div>
            <span className="font-display text-lg font-bold text-citra-ink">CITRA</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
