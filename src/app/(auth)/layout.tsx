import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import AuthSlideshow from '@/components/ui/AuthSlideshow'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <AuthSlideshow />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute left-12 top-12 z-20">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Kembali</span>
          </Link>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 text-center">
          <Logo
            variant="white"
            showText={false}
            iconSize={400}
            className=""
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-citra-canvas lg:w-1/2">
        <div className="w-full max-w-md px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  )
}