import { create } from 'zustand'

/** Opsi sorting yang tersedia */
type SortOption = 'rating' | 'terbaru' | 'nama'

/** State untuk filter pencarian */
interface FilterState {
  wilayah: string
  sentimen: string
  sort: SortOption
  q: string
  page: number
  setWilayah: (v: string) => void
  setSentimen: (v: string) => void
  setSort: (v: SortOption) => void
  setQ: (v: string) => void
  setPage: (v: number) => void
  reset: () => void
}

const defaults = { wilayah: '', sentimen: '', sort: 'rating' as SortOption, q: '', page: 1 }

/** Store untuk filter pencarian wisata/kuliner/nongkrong */
export const useFilterStore = create<FilterState>((set) => ({
  ...defaults,
  setWilayah: (v) => set({ wilayah: v, page: 1 }),
  setSentimen: (v) => set({ sentimen: v, page: 1 }),
  setSort: (v) => set({ sort: v, page: 1 }),
  setQ: (v) => set({ q: v, page: 1 }),
  setPage: (v) => set({ page: v }),
  reset: () => set(defaults),
}))