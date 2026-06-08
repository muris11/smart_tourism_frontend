"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'
import UserMenu from '@/components/ui/UserMenu'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { href: ROUTES.WISATA, label: 'Wisata' },
  { href: ROUTES.KULINER, label: 'Kuliner' },
  { href: ROUTES.NONGKRONG, label: 'Nongkrong' },
  { href: ROUTES.PLANNING, label: 'Rencana' },
  { href: ROUTES.TENTANG, label: 'Tentang' },
]

const drawerExtraLinks = [
  { href: ROUTES.CARI, label: 'Pencarian' },
  { href: ROUTES.REKOMENDASI, label: 'Rekomendasi' },
  { href: ROUTES.FAQ, label: 'FAQ' },
  { href: ROUTES.KONTAK, label: 'Kontak' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
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

  const showScrolled = scrolled || !isHome

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-500',
          'h-[68px] lg:h-20',
          showScrolled
            ? 'bg-citra-canvas/88 shadow-nav backdrop-blur-[18px] backdrop-saturate-[1.6]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-full w-full items-center justify-between px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1920px]">
          <Logo
            variant={showScrolled ? 'default' : 'white'}
            className="z-50"
          />

          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 xl:px-4',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                    isActive
                      ? 'text-citra-primary'
                      : showScrolled
                        ? 'text-citra-muted hover:text-citra-ink'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-citra-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={ROUTES.CARI}
              aria-label="Cari"
              className={cn(
                'rounded-lg p-2 transition-all duration-300 hover:scale-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                showScrolled
                  ? 'text-citra-muted hover:text-citra-ink'
                  : 'text-white/80 hover:text-white'
              )}
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Link>

            <div
              className={cn(
                'h-5 w-px',
                showScrolled ? 'bg-citra-border' : 'bg-white/20'
              )}
            />

            <UserMenu variant="desktop" scrolled={showScrolled} />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <Link
              href={ROUTES.CARI}
              aria-label="Cari"
              className={cn(
                'rounded-lg p-2 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                showScrolled
                  ? 'text-citra-muted hover:text-citra-ink'
                  : 'text-white/80 hover:text-white'
              )}
            >
              <Search className="h-5 w-5" />
            </Link>

            <button
              onClick={handleMenuToggle}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              className={cn(
                'relative z-50 rounded-lg p-2 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                showScrolled || mobileOpen
                  ? 'text-citra-ink hover:bg-citra-surface-soft'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={handleMenuClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      <div
        className={cn(
          'fixed left-0 right-0 top-0 z-40 flex flex-col bg-citra-canvas px-5 pb-8 pt-[74px] shadow-nav transition-all duration-500 ease-in-out lg:hidden border-b border-citra-border',
          mobileOpen 
            ? 'opacity-100 translate-y-0 max-h-[85vh] overflow-y-auto' 
            : 'opacity-0 -translate-y-full pointer-events-none max-h-0'
        )}
      >
        <div className="flex flex-col">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMenuClose}
                  className={cn(
                    'flex min-h-[52px] items-center rounded-xl px-4 text-base font-medium transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-inset',
                    isActive
                      ? 'bg-citra-primary-soft text-citra-primary font-semibold'
                      : 'text-citra-body hover:bg-citra-surface-soft hover:text-citra-ink'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="my-4 h-px bg-citra-border" />

          <div className="flex flex-col gap-0.5">
            {drawerExtraLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleMenuClose}
                className={cn(
                  'flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-citra-muted transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-inset',
                  'hover:bg-citra-surface-soft hover:text-citra-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-citra-border">
            <UserMenu variant="mobile" onMobileClose={handleMenuClose} />
          </div>
        </div>
      </div>
    </>
  )
}