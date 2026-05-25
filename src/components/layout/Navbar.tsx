"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'
import UserMenu from '@/components/ui/UserMenu'

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
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMenuClose = useCallback(() => setMobileOpen(false), [])
  const handleMenuToggle = useCallback(() => setMobileOpen((prev) => !prev), [])

  const isScrolledOrMobile = scrolled || mobileOpen || !isHome

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-500',
          isScrolledOrMobile
            ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200/80 py-3 shadow-sm md:py-4'
            : 'bg-transparent py-5 md:py-8'
        )}
      >
        <div className="container px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-between">

            <Link href="/" className="relative z-10 flex flex-col">
              <span
                className={cn(
                  'text-xl leading-none tracking-[0.12em] transition-colors duration-300 md:text-2xl font-bold font-display',
                  isScrolledOrMobile
                    ? 'text-brand-deep'
                    : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.18)]'
                )}
              >
                CITRA
              </span>
              <span
                className={cn(
                  'mt-0.5 text-[8px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 md:mt-1 md:text-[9px]',
                  isScrolledOrMobile
                    ? 'text-slate-400'
                    : 'text-white/70'
                )}
              >
                Tourism Assistant
              </span>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium lg:flex xl:gap-10">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + '/')

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative py-2 transition-all duration-300',
                      isActive
                        ? isScrolledOrMobile
                          ? 'text-brand-deep font-semibold'
                          : 'text-white'
                        : isScrolledOrMobile
                          ? 'text-slate-500 hover:text-brand-deep'
                          : 'text-white/75 hover:text-white'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className={cn(
                          'absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full transition-all duration-300',
                          isScrolledOrMobile
                            ? 'bg-brand'
                            : 'bg-white'
                        )}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden items-center gap-4 lg:flex lg:gap-5">
              <Link
                href={ROUTES.CARI}
                aria-label="Search"
                className={cn(
                  'transition-all duration-300 hover:scale-110',
                  isScrolledOrMobile
                    ? 'text-slate-400 hover:text-brand-deep'
                    : 'text-white/75 hover:text-white'
                )}
              >
                <Search className="h-4 w-4 md:h-5 md:w-5" />
              </Link>

              <div
                className={cn(
                  'h-4 w-px',
                  isScrolledOrMobile
                    ? 'bg-slate-200'
                    : 'bg-white/20'
                )}
              />

              <UserMenu variant="desktop" scrolled={isScrolledOrMobile} />
            </div>

            <button
              onClick={handleMenuToggle}
              aria-label="Toggle Menu"
              className={cn(
                'relative z-10 rounded-lg p-1.5 transition-colors md:p-2 lg:hidden',
                isScrolledOrMobile
                  ? 'text-brand-deep hover:bg-slate-100'
                  : 'text-white hover:bg-white/10',
                mobileOpen && 'bg-slate-100 text-brand-deep'
              )}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={handleMenuClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden',
          mobileOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      />

      <div
        className={cn(
          'fixed inset-y-0 right-0 z-40 flex w-full max-w-xs flex-col bg-white px-5 pb-6 pt-20 shadow-xl transition-transform duration-500 sm:max-w-sm sm:px-6 sm:pb-8 sm:pt-24 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(link.href + '/')

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleMenuClose}
                className={cn(
                  'rounded-xl px-4 py-3 text-base font-medium transition-all hover:bg-slate-50 sm:px-5 sm:py-3.5 sm:text-lg',
                  isActive
                    ? 'bg-slate-50 text-brand font-semibold'
                    : 'text-slate-600 hover:text-brand-deep'
                )}
              >
                {link.label}
              </Link>
            )
          })}

          <div className="my-3 h-px bg-slate-100 sm:my-4" />

          {[
            { href: ROUTES.CARI, label: 'Pencarian' },
            { href: ROUTES.REKOMENDASI, label: 'Rekomendasi' },
            { href: ROUTES.FAQ, label: 'FAQ' },
            { href: ROUTES.KONTAK, label: 'Kontak' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleMenuClose}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-500 transition-all hover:bg-slate-50 hover:text-brand-deep sm:px-5 sm:py-3.5 sm:text-lg"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-4 sm:pt-6">
          <UserMenu variant="mobile" onMobileClose={handleMenuClose} />
        </div>
      </div>
    </>
  )
}
