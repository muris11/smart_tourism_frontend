/**
 * Navbar - Komponen navigasi utama untuk halaman utama
 * 
 * Fitur:
 * - Responsive design (Desktop & Mobile)
 * - Transparent background di home page saat scroll ke atas
 * - Solid background setelah scroll atau di halaman lain
 * - Mobile drawer menu dengan overlay
 * - Active link indicator
 * - Search button & User menu
 * 
 * @returns {JSX.Element} Navbar dengan navigasi dan user menu
 */
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'
import UserMenu from '@/components/ui/UserMenu'

/** Daftar link navigasi utama */
const links = [
  { href: ROUTES.WISATA, label: 'Wisata' },
  { href: ROUTES.KULINER, label: 'Kuliner' },
  { href: ROUTES.NONGKRONG, label: 'Nongkrong' },
  { href: ROUTES.PLANNING, label: 'Rencana' },
  { href: ROUTES.TENTANG, label: 'Tentang' },
]

export default function Navbar() {
  /** URL path saat ini untuk menentukan active link */
  const pathname = usePathname()

  /** State untuk mendeteksi apakah halaman sudah di-scroll */
  const [scrolled, setScrolled] = useState(false)

  /** State untuk membuka/tutup mobile menu drawer */
  const [mobileOpen, setMobileOpen] = useState(false)

  /** Cek apakah sedang di halaman beranda */
  const isHome = pathname === '/'

  /**
   * Effect: Mendeteksi scroll position
   * - scrolled = true jika scrollY > 20px
   * - Menambahkan/remove event listener scroll
   */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    onScroll()

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /**
   * Effect: Lock body scroll saat mobile menu terbuka
   * - Mencegah scroll di background saat drawer terbuka
   * - Mengembalikan scroll saat drawer ditutup
   */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  /** Handler untuk menutup mobile menu */
  const handleMenuClose = useCallback(() => {
    setMobileOpen(false)
  }, [])

  /** Handler untuk toggle (buka/tutup) mobile menu */
  const handleMenuToggle = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  /**
   * Kondisi untuk menentukan style Navbar:
   * - scrolled: sudah di-scroll
   * - mobileOpen: menu mobile terbuka  
   * - !isHome: bukan halaman beranda
   * 
   * Jika true: background putih solid
   * Jika false: background transparan (hanya di home page saat belum scroll)
   */
  const isScrolledOrMobile = scrolled || mobileOpen || !isHome

  return (
    <>
      {/* MAIN HEADER / NAVBAR */}
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-500',
          scrolled || mobileOpen
            ? 'border-b border-slate-200 bg-white py-3 shadow-sm md:py-4'
            : 'bg-transparent py-5 md:py-8'
        )}
      >
        <div className="container px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="relative z-10 flex flex-col">
              <span
                className={cn(
                  'text-xl leading-none tracking-[0.12em] transition-colors duration-300 md:text-2xl',
                  isScrolledOrMobile
                    ? 'text-brand-navy'
                    : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.18)]'
                )}
              >
                CITRA
              </span>

              <span
                className={cn(
                  'mt-0.5 text-[8px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 md:mt-1 md:text-[9px]',
                  isScrolledOrMobile
                    ? 'text-slate-500'
                    : 'text-white/78'
                )}
              >
                Tourism Assistant
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-10">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + '/')

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative py-2 transition-all duration-300 hover:scale-105',
                      isActive
                        ? isScrolledOrMobile
                          ? 'text-brand-navy font-semibold'
                          : 'text-white'
                        : isScrolledOrMobile
                          ? 'text-slate-500 hover:text-brand-navy'
                          : 'text-white/80 hover:text-white'
                    )}
                  >
                    {link.label}

                    {isActive && (
                      <span
                        className={cn(
                          'absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full transition-all duration-300',
                          isScrolledOrMobile
                            ? 'bg-brand-green'
                            : 'bg-white'
                        )}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* DESKTOP RIGHT SECTION (Search + UserMenu) */}
            <div className="hidden items-center gap-4 lg:flex lg:gap-6">
              <Link
                href={ROUTES.CARI}
                aria-label="Search"
                className={cn(
                  'transition-all duration-300 hover:scale-110',
                  isScrolledOrMobile
                    ? 'text-slate-500 hover:text-brand-navy'
                    : 'text-white/80 hover:text-white'
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

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={handleMenuToggle}
              aria-label="Toggle Menu"
              className={cn(
                'relative z-10 rounded-lg p-1.5 transition-colors md:p-2 lg:hidden',
                isScrolledOrMobile
                  ? 'text-brand-navy hover:bg-brand-pale'
                  : 'text-white hover:bg-white/10',
                mobileOpen && 'bg-brand-pale text-brand-navy'
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

      {/* MOBILE OVERLAY (background gelap) */}
      <div
        onClick={handleMenuClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 lg:hidden',
          mobileOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      />

      {/* MOBILE DRAWER MENU */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-40 flex w-full max-w-70 flex-col bg-white px-5 pb-6 pt-20 shadow-xl transition-transform duration-500 sm:max-w-sm sm:px-6 sm:pb-8 sm:pt-24 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-1">
          {/* Main Navigation Links */}
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
                  'rounded-lg px-3 py-2.5 text-base font-medium transition-all hover:bg-brand-pale sm:px-4 sm:py-3 sm:text-lg',
                  isActive
                    ? 'bg-brand-pale text-brand-navy font-semibold'
                    : 'text-slate-600 hover:text-brand-navy'
                )}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Separator */}
          <div className="my-3 h-px bg-slate-200 sm:my-4" />

          {/* Secondary Navigation Links */}
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
              className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-600 transition-all hover:bg-brand-pale hover:text-brand-navy sm:px-4 sm:py-3 sm:text-lg"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Menu untuk mobile - posisinya di bagian bawah */}
        <div className="mt-auto pt-4 sm:pt-6">
          <UserMenu variant="mobile" onMobileClose={handleMenuClose} />
        </div>
      </div>
    </>
  )
}