import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/auth'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
