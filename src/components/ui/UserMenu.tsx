/**
 * UserMenu - Komponen menu pengguna untuk autentikasi
 * 
 * Fitur:
 * - Menampilkan tombol login/register jika belum login
 * - Menampilkan dropdown menu jika sudah login (desktop)
 * - Menampilkan drawer menu jika sudah login (mobile)
 * - Toggle dropdown dengan klik di luar area
 * - Styling responsif untuk desktop dan mobile
 * - Styling berbeda berdasarkan scroll state
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {'desktop' | 'mobile'} [props.variant='desktop'] - Variant untuk tampilan desktop atau mobile
 * @param {function} [props.onMobileClose] - Callback saat menu mobile ditutup
 * @param {boolean} [props.scrolled=false] - Status scroll navbar untuk styling
 * 
 * @returns {JSX.Element} Menu pengguna sesuai variant
 * 
 * @example
 * // Desktop usage
 * <UserMenu variant="desktop" scrolled={isScrolledOrMobile} />
 * 
 * @example
 * // Mobile usage
 * <UserMenu variant="mobile" onMobileClose={handleMenuClose} />
 */
'use client'

import Link from 'next/link'
import { User, LogOut, Settings, UserCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'
import { ROUTES } from '@/lib/constants/routes'

/** Interface untuk props UserMenu component */
interface UserMenuProps {
    /** Additional CSS classes */
    className?: string
    /** Variant tampilan: desktop atau mobile */
    variant?: 'desktop' | 'mobile'
    /** Callback saat menu mobile ditutup */
    onMobileClose?: () => void
    /** Status scroll navbar untuk styling */
    scrolled?: boolean
}

export default function UserMenu({
    className,
    variant = 'desktop',
    onMobileClose,
    scrolled = false
}: UserMenuProps) {
    /** Hook autentikasi untuk mendapatkan user dan fungsi login/logout */
    const { user, isLoggedIn, logout } = useAuth()

    /** State untuk membuka/tutup dropdown menu (desktop) */
    const [isOpen, setIsOpen] = useState(false)

    /** Ref untuk mendeteksi klik di luar dropdown */
    const dropdownRef = useRef<HTMLDivElement>(null)

    /**
     * Effect: Menutup dropdown saat klik di luar area
     * - Menambahkan event listener klik pada document
     * - Memeriksa apakah target klik berada di luar dropdownRef
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    /**
     * Handler untuk logout
     * - Memanggil fungsi logout dari useAuth
     * - Menutup dropdown
     * - Menutup mobile drawer jika ada
     */
    const handleLogout = async () => {
        await logout()
        setIsOpen(false)
        if (onMobileClose) onMobileClose()
    }

    // ========== MOBILE VARIANT ==========
    if (variant === 'mobile') {

        // Mobile: Belum Login
        if (!isLoggedIn) {
            return (
                <div className={cn('flex flex-col gap-3 pt-8', className)}>
                    <Link
                        href={ROUTES.LOGIN}
                        onClick={onMobileClose}
                        className="w-full rounded-full border border-slate-200 py-3.5 text-center text-sm font-semibold text-brand-navy transition-all hover:border-brand-navy hover:bg-brand-pale"
                    >
                        Masuk ke Akun
                    </Link>
                    <Link
                        href={ROUTES.REGISTER}
                        onClick={onMobileClose}
                        className="w-full rounded-full bg-brand-navy py-3.5 text-center text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-brand-navy/90"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            )
        }

        // Mobile: Sudah Login
        return (
            <div className={cn('flex flex-col gap-2 pt-8', className)}>
                {/* Profile Info Card */}
                <div className="flex items-center gap-3 px-4 py-3 bg-brand-pale rounded-xl">
                    <div className="h-10 w-10 rounded-full bg-brand-navy/10 flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-brand-navy" />
                    </div>
                    <div>
                        <p className="font-semibold text-brand-navy">{user?.nama}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                </div>

                {/* Settings Link */}
                <Link
                    href='/profil'
                    onClick={onMobileClose}
                    className="rounded-lg px-4 py-3 text-lg font-medium text-slate-600 transition-all hover:bg-brand-pale hover:text-brand-navy"
                >
                    <Settings className="inline h-5 w-5 mr-2" />
                    Pengaturan
                </Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="rounded-lg px-4 py-3 text-lg font-medium text-red-600 transition-all hover:bg-red-50 text-left"
                >
                    <LogOut className="inline h-5 w-5 mr-2" />
                    Keluar
                </button>
            </div>
        )
    }

    // ========== DESKTOP VARIANT ==========

    // Desktop: Belum Login
    if (!isLoggedIn) {
        return (
            <div className={cn('hidden items-center gap-6 lg:flex', className)}>
                <Link
                    href={ROUTES.LOGIN}
                    className={cn(
                        'text-sm font-semibold transition-all duration-300 hover:scale-105',
                        scrolled
                            ? 'text-slate-600 hover:text-brand-navy'
                            : 'text-white/90 hover:text-white'
                    )}
                >
                    Masuk
                </Link>
                <Link
                    href={ROUTES.REGISTER}
                    className={cn(
                        'rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md',
                        scrolled
                            ? 'bg-brand-navy text-white hover:bg-brand-navy/90'
                            : 'bg-white text-brand-navy hover:bg-gray-100'
                    )}
                >
                    Daftar
                </Link>
            </div>
        )
    }

    // Desktop: Sudah Login (dengan dropdown)
    return (
        <div className={cn('relative hidden lg:block', className)} ref={dropdownRef}>
            {/* Dropdown Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-2 transition-all hover:bg-brand-pale/80',
                    scrolled
                        ? 'bg-brand-pale'
                        : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                )}
            >
                {/* Avatar Icon */}
                <div className={cn(
                    'h-7 w-7 rounded-full flex items-center justify-center',
                    scrolled
                        ? 'bg-brand-navy/20'
                        : 'bg-white/20'
                )}>
                    <User className={cn(
                        'h-3.5 w-3.5',
                        scrolled ? 'text-brand-navy' : 'text-white'
                    )} />
                </div>

                {/* User Name */}
                <span className={cn(
                    'text-sm font-medium max-w-30 truncate',
                    scrolled ? 'text-brand-navy' : 'text-white'
                )}>
                    {user?.nama}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <p className="text-sm font-semibold text-brand-navy truncate">{user?.nama}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>

                    {/* Profile Link */}
                    <Link
                        href='/profil'
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-brand-pale transition-colors"
                    >
                        <UserCircle className="h-4 w-4" />
                        Profil Saya
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
                    >
                        <LogOut className="h-4 w-4" />
                        Keluar
                    </button>
                </div>
            )}
        </div>
    )
}