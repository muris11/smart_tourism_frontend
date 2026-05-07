"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

const links = [
  { href: ROUTES.WISATA, label: 'Wisata' },
  { href: ROUTES.KULINER, label: 'Kuliner' },
  { href: ROUTES.NONGKRONG, label: 'Nongkrong' },
  { href: ROUTES.PLANNING, label: 'Rencana' },
  { href: ROUTES.TENTANG, label: 'Tentang' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-500',
          scrolled || mobileOpen
            ? 'border-b border-black/5 bg-white/92 py-4 backdrop-blur-xl'
            : 'bg-transparent py-6 md:py-8'
        )}
      >
        <div className={cn('container flex items-center justify-between px-6 md:px-12', !scrolled && isHome && !mobileOpen ? 'rounded-full bg-white/12 py-3 backdrop-blur-md ring-1 ring-white/18' : '')}>
          <Link href="/" className="relative z-10 flex flex-col">
            <span className={cn('text-2xl leading-none tracking-[0.12em]', !scrolled && isHome && !mobileOpen ? 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.18)]' : 'text-brand-navy')}>CITRA</span>
            <span className={cn('mt-1 text-[9px] font-semibold uppercase tracking-[0.22em]', !scrolled && isHome && !mobileOpen ? 'text-white/78' : 'text-slate-500')}>Tourism Assistant</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex xl:gap-10">
            {links.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative py-2 transition-colors duration-300',
                      active
                      ? !scrolled && isHome
                        ? 'text-white'
                        : 'text-brand-navy'
                      : !scrolled && isHome
                        ? 'text-white/80 hover:text-white'
                        : 'text-slate-500 hover:text-brand-navy'
                  )}
                >
                  {link.label}
                  {active ? <span className={cn('absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full', !scrolled && isHome ? 'bg-white' : 'bg-[var(--color-brand)]')} /> : null}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link href={ROUTES.CARI} className={cn('transition hover:scale-110', !scrolled && isHome ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-brand-navy')}>
              <Search className="h-5 w-5" />
            </Link>
            <div className={cn('h-4 w-px', !scrolled && isHome ? 'bg-white/20' : 'bg-slate-200')} />
            <Link href={ROUTES.LOGIN} className={cn('text-sm font-semibold transition-colors', !scrolled && isHome ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-brand-navy')}>Masuk</Link>
            <Link href={ROUTES.REGISTER} className={cn('rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md', !scrolled && isHome ? 'bg-white text-brand-navy hover:bg-brand-pale' : 'bg-brand-navy text-white hover:bg-[var(--color-brand)]')}>Daftar</Link>
          </div>

          <button className={cn('relative z-10 p-2 lg:hidden', !scrolled && isHome && !mobileOpen ? 'text-white' : 'text-brand-navy')} onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle Menu">
            {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      <div className={cn('fixed inset-0 z-40 flex flex-col bg-[var(--color-brand-pale)] px-6 pt-24 pb-8 transition-transform duration-500 lg:hidden', mobileOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex flex-col gap-6 text-xl text-brand-navy">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn('border-b border-slate-200 pb-4', pathname.startsWith(link.href) ? 'text-brand-navy' : 'hover:text-brand-navy')}>
              {link.label}
            </Link>
          ))}
          <Link href={ROUTES.CARI} className="border-b border-slate-200 pb-4 hover:text-brand-navy">Pencarian</Link>
          <Link href={ROUTES.REKOMENDASI} className="border-b border-slate-200 pb-4 hover:text-brand-navy">Rekomendasi</Link>
          <Link href={ROUTES.FAQ} className="border-b border-slate-200 pb-4 hover:text-brand-navy">FAQ</Link>
          <Link href={ROUTES.KONTAK} className="border-b border-slate-200 pb-4 hover:text-brand-navy">Kontak</Link>
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <Link href={ROUTES.LOGIN} className="w-full rounded-full border border-slate-200 py-4 text-center text-sm font-semibold text-brand-navy">Masuk ke Akun</Link>
          <Link href={ROUTES.REGISTER} className="w-full rounded-full bg-brand-navy py-4 text-center text-sm font-semibold text-white">Daftar Sekarang</Link>
        </div>
      </div>
    </>
  )
}
