'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, LayoutDashboard, ChevronDown, UserCircle, Settings } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useHydrated } from '@/stores/authStore'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants/routes'
import { getAvatarUrl } from '@/lib/api/client'

interface UserMenuProps {
  className?: string
  variant?: 'desktop' | 'mobile'
  scrolled?: boolean
  onMobileClose?: () => void
}

export default function UserMenu({
  className,
  variant = 'desktop',
  scrolled = false,
  onMobileClose,
}: UserMenuProps) {
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuth()
  const hydrated = useHydrated()
  const [isOpen, setIsOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!hydrated) {
    if (variant === 'mobile') {
      return <div className="skeleton-shimmer h-24 rounded-xl" />
    }
    return <div className="skeleton-shimmer h-9 w-24 rounded-full" />
  }

  const handleLogout = async () => {
    setIsOpen(false)
    onMobileClose?.()
    await logout()
  }

  const initial = user?.nama?.charAt(0)?.toUpperCase() || '?'

  const avatarEl = (size: 'sm' | 'md', scrolled = false) => {
    const avatarUrl = getAvatarUrl(user?.avatar_url)
    if (avatarUrl && !avatarError) {
      return (
        <img
          src={avatarUrl}
          alt={user?.nama || 'Avatar'}
          className={cn(
            'rounded-full object-cover',
            size === 'md' ? 'h-10 w-10' : 'h-8 w-8'
          )}
          onError={() => setAvatarError(true)}
        />
      )
    }
    return (
      <span className={cn(
        'flex items-center justify-center rounded-full text-sm font-bold',
        size === 'md' ? 'h-10 w-10' : 'h-8 w-8',
        scrolled
          ? 'bg-citra-primary text-citra-on-primary'
          : 'bg-white/20 text-white'
      )}>
        {initial}
      </span>
    )
  }

  // ===== MOBILE VARIANT =====
  if (variant === 'mobile') {
    if (!isLoggedIn) {
      return (
        <div className={cn('flex flex-col gap-3', className)}>
          <Link
            href={ROUTES.LOGIN}
            onClick={onMobileClose}
            className="w-full rounded-full border border-citra-border-strong py-3.5 text-center text-sm font-semibold text-citra-ink transition-all hover:bg-citra-surface-soft"
          >
            Masuk
          </Link>
          <Link
            href={ROUTES.REGISTER}
            onClick={onMobileClose}
            className="inline-flex items-center justify-center rounded-full bg-citra-primary text-white hover:bg-citra-primary-hover active:bg-citra-primary-active active:scale-[.97] shadow-sm min-h-12 px-6 text-[0.9375rem] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas disabled:pointer-events-none disabled:opacity-50 w-full"
          >
            Daftar
          </Link>
        </div>
      )
    }

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <div className="flex items-center gap-3 rounded-xl bg-citra-surface-green px-4 py-3">
          {avatarEl('md')}
          <div>
            <p className="font-semibold text-citra-ink">{user?.nama}</p>
            <p className="text-xs text-citra-muted">{user?.email}</p>
          </div>
        </div>

        <Link
          href="/profil"
          onClick={onMobileClose}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-citra-body transition-all hover:bg-citra-primary-soft hover:text-citra-ink"
        >
          <UserCircle className="h-5 w-5 text-citra-muted" />
          Profil
        </Link>

        <Link
          href="/planning"
          onClick={onMobileClose}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-citra-body transition-all hover:bg-citra-primary-soft hover:text-citra-ink"
        >
          <LayoutDashboard className="h-5 w-5 text-citra-muted" />
          Rencana Saya
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-citra-terracotta transition-all hover:bg-citra-primary-soft text-left"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </button>
      </div>
    )
  }

  // ===== DESKTOP VARIANT =====

  if (!isLoggedIn) {
    return (
      <div className={cn('hidden items-center gap-3 lg:flex', className)}>
        <Link
          href={ROUTES.LOGIN}
          className={cn(
            'text-sm font-semibold transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2',
            scrolled
              ? 'text-citra-body hover:text-citra-ink'
              : 'text-white/90 hover:text-white'
          )}
        >
          Masuk
        </Link>
        <Link
          href={ROUTES.REGISTER}
          className={cn(
            'rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2',
            scrolled
              ? 'bg-citra-primary text-citra-on-primary hover:bg-citra-primary-hover'
              : 'bg-white text-citra-ink hover:bg-gray-100'
          )}
        >
          Daftar
        </Link>
      </div>
    )
  }

  return (
    <div className={cn('relative hidden lg:block', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2',
          scrolled
            ? 'bg-citra-surface-soft hover:bg-citra-primary-soft'
            : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
        )}
        aria-label="Menu pengguna"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {avatarEl('sm', scrolled)}
        <span className={cn(
          'hidden text-sm font-semibold sm:inline max-w-28 truncate',
          scrolled ? 'text-citra-ink' : 'text-white'
        )}>
          {user?.nama}
        </span>
        <ChevronDown className={cn(
          'h-4 w-4 transition-transform',
          isOpen && 'rotate-180',
          scrolled ? 'text-citra-muted' : 'text-white/70'
        )} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md bg-citra-surface shadow-floating border border-citra-border py-1 z-50"
          role="menu"
        >
          <div className="border-b border-citra-border px-4 py-3">
            <p className="truncate text-sm font-semibold text-citra-ink">{user?.nama}</p>
            <p className="truncate text-xs text-citra-muted">{user?.email}</p>
          </div>

          <Link
            href="/profil"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-citra-ink transition-colors hover:bg-citra-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-inset"
            role="menuitem"
          >
            <User className="h-4 w-4 text-citra-muted" />
            Profil
          </Link>

          <Link
            href="/planning"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-citra-ink transition-colors hover:bg-citra-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-inset"
            role="menuitem"
          >
            <LayoutDashboard className="h-4 w-4 text-citra-muted" />
            Rencana Saya
          </Link>

          <div className="mt-1 border-t border-citra-border pt-1">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-citra-terracotta transition-colors hover:bg-citra-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-inset"
              role="menuitem"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
