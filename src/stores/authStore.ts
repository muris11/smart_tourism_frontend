import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

/** State untuk autentikasi user */
interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  setAuth: (user: User, token: string) => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

/** Store untuk autentikasi dengan persist ke localStorage */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      setAuth: (user, token) => set({ user, token, isLoading: false }),
      setUser: (user) => set({ user, isLoading: false }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => {
        set({ user: null, token: null, isLoading: false })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)