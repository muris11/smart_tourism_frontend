import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { recommendationApi } from '@/lib/api/recommendation'
import { useAuthStore } from './authStore'

/** State untuk wishlist / tempat favorit */
interface WishlistState {
    items: string[]
    addItem: (kode: string, tipe: 'wisata' | 'kuliner' | 'nongkrong') => void
    removeItem: (kode: string, tipe: 'wisata' | 'kuliner' | 'nongkrong') => void
    isInWishlist: (kode: string) => boolean
    clearWishlist: () => void
}

/** Store untuk wishlist dengan persist ke localStorage */
export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: async (kode, tipe) => {
                set((s) => ({ items: [...s.items, kode] }))

                const user = useAuthStore.getState().user
                if (user) {
                    try {
                        await recommendationApi.trackHistory({
                            user_id: user.id,
                            tipe_tempat: tipe,
                            tempat_kode: kode,
                            aksi: 'simpan',
                        })
                    } catch (error) {
                        console.error('Failed to track save:', error)
                    }
                }
            },
            removeItem: async (kode, tipe) => {
                set((s) => ({ items: s.items.filter((i) => i !== kode) }))

                const user = useAuthStore.getState().user
                if (user) {
                    try {
                        await recommendationApi.trackHistory({
                            user_id: user.id,
                            tipe_tempat: tipe,
                            tempat_kode: kode,
                            aksi: 'simpan',
                        })
                    } catch (error) {
                        console.error('Failed to track unsave:', error)
                    }
                }
            },
            isInWishlist: (kode) => get().items.includes(kode),
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
)