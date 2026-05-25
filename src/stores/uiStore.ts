import { create } from 'zustand'

/** State untuk UI global */
interface UIState {
    sidebarOpen: boolean
    theme: 'light' | 'dark'
    isLoading: boolean
    toggleSidebar: () => void
    setTheme: (theme: 'light' | 'dark') => void
    setLoading: (isLoading: boolean) => void
}

/** Store untuk UI global */
export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: false,
    theme: 'light',
    isLoading: false,
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    setTheme: (theme) => set({ theme }),
    setLoading: (isLoading) => set({ isLoading }),
}))