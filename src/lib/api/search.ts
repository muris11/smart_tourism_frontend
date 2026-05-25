import { apiClient } from './client'
import type { Wilayah } from '@/types'

/** Parameter pencarian */
export interface SearchParams {
  /** Kata kunci pencarian (wajib) */
  q: string
  /** Filter berdasarkan tipe tempat */
  tipe?: 'wisata' | 'kuliner' | 'nongkrong'
  /** Filter berdasarkan wilayah */
  wilayah?: Wilayah
  /** Jumlah hasil per halaman */
  limit?: number
  /** Halaman hasil pencarian */
  page?: number
}

/** Hasil item pencarian */
export interface SearchResultItem {
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: Wilayah
  kecamatan: string | null
  alamat_lengkap: string | null
  gambar: string | null
  harga_min: number | null
  harga_max: number | null
  jam_buka: string | null
  jam_tutup: string | null
  rating_google: number | null
  sentimen: string | null
  skor_sentimen: number | null
  link_google_maps: string | null
  /** Skor relevansi dari Full-Text Search */
  rank: number
}

/** Response dari endpoint search */
interface SearchResponse {
  success: boolean
  message: string
  data: SearchResultItem[]
  meta?: {
    query: string
    total: number
  }
}

export const searchApi = {
  /**
   * Pencarian global untuk wisata, kuliner, dan nongkrong
   * GET /api/v1/search
   * 
   * @param params - Parameter pencarian (q wajib, tipe, wilayah, limit)
   * @returns Hasil pencarian dengan skor relevansi (rank)
   */
  search: async (params: SearchParams): Promise<SearchResponse> => {
    const { data } = await apiClient.get<SearchResponse>('/search', { params })
    return data
  },
}