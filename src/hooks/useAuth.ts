'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/authStore'
import type { LoginPayload, RegisterPayload } from '@/types'

/** Hook untuk autentikasi user (login, register, logout) */
export function useAuth() {
  const router = useRouter()
  const { user, token, setAuth, setUser, logout: clearUser } = useAuthStore()

  /**
   * Validasi token saat mount, ambil data user jika token ada
   * Dipanggil saat komponen pertama kali di-render
   */
  const validateToken = useCallback(async () => {
    if (token && !user) {
      try {
        const me = await authApi.me()
        if (me) {
          setUser(me)
        } else {
          clearUser()
        }
      } catch {
        clearUser()
      }
    }
  }, [token, user, setUser, clearUser])

  useEffect(() => {
    validateToken()
  }, [validateToken])

  /** Login user dengan email dan password */
  const login = async (payload: LoginPayload) => {
    const result = await authApi.login(payload)
    setAuth(result.user, result.token)
    router.push('/')
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

    const loginResult = await authApi.login({
      email: payload.email,
      password: payload.password,
    })

    setAuth(loginResult.user, loginResult.token)
    router.push('/')
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
    isLoggedIn: !!user && !!token,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  }
}