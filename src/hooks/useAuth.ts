'use client'

import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/authStore'
import type { LoginPayload, RegisterPayload } from '@/types'

/** Hook untuk autentikasi user (login, register, logout) */
export function useAuth() {
  const router = useRouter()
  const { user, token, isLoading, setAuth, setUser, logout: clearUser } = useAuthStore()

  /** Login user dengan email dan password, opsional redirect setelah login */
  const login = async (payload: LoginPayload, callbackUrl?: string) => {
    const result = await authApi.login(payload)
    setAuth(result.user, result.token)
    router.push(callbackUrl || '/')
  }

  /**
   * Register user baru (langsung login setelah sukses)
   * @param payload - Data registrasi (nama, email, password)
   * @param callbackUrl - Opsional redirect setelah register
   */
  const register = async (payload: RegisterPayload, callbackUrl?: string) => {
    const registerResult = await authApi.register(payload)

    if (!registerResult.success) {
      throw new Error(registerResult.message || 'Registrasi gagal')
    }

    const loginResult = await authApi.login({
      email: payload.email,
      password: payload.password,
    })

    setAuth(loginResult.user, loginResult.token)
    router.push(callbackUrl || '/')
  }

  /** Logout user, hapus token dan redirect ke halaman login */
  const logout = async () => {
    await authApi.logout()
    clearUser()
    router.push('/login')
  }

  /**
   * Update profil user
   * @param payload - Data yang akan diupdate (nama, avatar_url)
   */
  const updateProfile = async (payload: { nama?: string; avatar_url?: string }) => {
    await authApi.updateProfile(payload)
    if (user && payload.nama) {
      setAuth({ ...user, nama: payload.nama }, token!)
    }
  }

  return {
    user,
    token,
    isLoading,
    isLoggedIn: !!user && !!token,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  }
}