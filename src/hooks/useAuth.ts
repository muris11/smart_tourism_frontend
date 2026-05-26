'use client'

import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore, useHydrated } from '@/stores/authStore'
import type { LoginPayload, RegisterPayload } from '@/types'

/** Hook untuk autentikasi user (login, register, logout) */
export function useAuth() {
  const router = useRouter()
  const { user, token, isLoading, setAuth, setUser, logout: clearUser } = useAuthStore()
  const hasHydrated = useHydrated()

  /** Login user dengan email dan password */
  const login = async (payload: LoginPayload) => {
    const result = await authApi.login(payload)
    setAuth(result.user, result.token)
  }

  /**
   * Register user baru (langsung login setelah sukses)
   * @param payload - Data registrasi (nama, email, password)
   */
  const register = async (payload: RegisterPayload) => {
    const registerResult = await authApi.register(payload)

    if (!registerResult.success) {
      throw new Error(registerResult.message || 'Registrasi gagal')
    }

    if (registerResult.user && registerResult.token) {
      setAuth(registerResult.user, registerResult.token)
    } else {
      const loginResult = await authApi.login({
        email: payload.email,
        password: payload.password,
      })
      setAuth(loginResult.user, loginResult.token)
    }
  }

  /** Logout user, hapus token dan redirect ke halaman login */
  const logout = async () => {
    await authApi.logout()
    clearUser()
    router.push('/login')
  }

  /**
   * Update profil user
   * @param payload - Data yang akan diupdate (nama, avatar_url) atau FormData (file upload)
   */
  const updateProfile = async (payload: { nama?: string; avatar_url?: string } | FormData): Promise<boolean> => {
    const updated = await authApi.updateProfile(payload)
    if (updated) {
      setAuth(updated, token!)
      return true
    }
    if (payload instanceof FormData) {
      const meUser = await authApi.me()
      if (meUser) {
        setAuth(meUser, token!)
        return true
      }
      return false
    }
    if (user && payload.nama) {
      setAuth({ ...user, nama: payload.nama }, token!)
      return true
    }
    return false
  }

  return {
    user,
    token,
    isLoading,
    hasHydrated,
    isLoggedIn: !!user && !!token,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  }
}