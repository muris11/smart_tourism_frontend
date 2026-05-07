'use client'

import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/authStore'
import { LoginPayload, RegisterPayload } from '@/types/auth'

export function useAuth() {
  const { user, setUser, logout: clearUser } = useAuthStore()
  const router = useRouter()

  const login = async (payload: LoginPayload) => {
    const result = await authApi.login(payload)
    setUser(result.user)
    router.push('/')
    return result
  }

  const register = async (payload: RegisterPayload) => {
    const result = await authApi.register(payload)
    setUser(result.user)
    router.push('/')
    return result
  }

  const logout = async () => {
    await authApi.logout()
    clearUser()
    router.push('/login')
  }

  return {
    user,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  }
}
