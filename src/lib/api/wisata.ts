import { apiClient } from './client'
import type {
  WisataFilter,
  WisataListResponse,
  WisataDetailResponse
} from '@/types'

export const wisataApi = {
  /**
   * Daftar semua wisata (publik)
   * GET /api/v1/wisata/
   * 
   * @param filters - Filter untuk list wisata (wilayah, kategori, sentimen, q, sort_by, order, page, limit)
   * @returns Object berisi items (array wisata) dan metadata pagination
   */
  list: async (filters?: WisataFilter): Promise<WisataListResponse['data']> => {
    const { data } = await apiClient.get<WisataListResponse>('/wisata', { params: filters })
    return data.data
  },

  /**
   * Detail wisata berdasarkan kode
   * GET /api/v1/wisata/{kode}
   * 
   * @param kode - Kode unik wisata (contoh: WIS-CRB-012)
   * @returns Data detail wisata lengkap
   */
  detail: async (kode: string): Promise<WisataDetailResponse['data']> => {
    const { data } = await apiClient.get<WisataDetailResponse>(`/wisata/${kode}`)
    return data.data
  },
}