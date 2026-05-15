import { ApiResponse } from '@/types/api'
import { apiClient } from './client'

export interface SearchParams {
  q: string
  tipe?: string
  wilayah?: string
  limit?: number
}

export interface SearchResultItem {
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: string
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
  rank: number
}

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
  search: async (params: SearchParams): Promise<SearchResponse> => {
    const { data } = await apiClient.get<SearchResponse>('/search', { params })
    return data
  },
}
