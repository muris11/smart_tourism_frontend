'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/lib/api/auth'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, user, setUser, setLoading, logout } = useAuthStore()

  useEffect(() => {
    if (token && !user) {
      setLoading(true)
      authApi.me()
        .then((me) => {
          if (me) setUser(me)
          else logout()
        })
        .catch(() => logout())
    } else if (!token) {
      setLoading(false)
    }
  }, [])

  return <>{children}</>
}
