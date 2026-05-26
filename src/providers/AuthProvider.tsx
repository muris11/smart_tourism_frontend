'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore, useHydrated } from '@/stores/authStore'
import { authApi } from '@/lib/api/auth'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, user, setUser, setLoading, logout } = useAuthStore()
  const hydrated = useHydrated()
  const validated = useRef(false)

  useEffect(() => {
    if (!hydrated || validated.current) return

    if (token) {
      validated.current = true
      setLoading(true)
      authApi.me()
        .then((me) => {
          if (me) setUser(me)
          else logout()
        })
        .catch(() => logout())
    } else {
      validated.current = true
      setLoading(false)
    }
  }, [hydrated, token])

  return <>{children}</>
}
