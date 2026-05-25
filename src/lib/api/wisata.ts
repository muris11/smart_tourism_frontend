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
   * @param filters - Filter untuk list wisata (wilayah, kategori_utama, sentimen, q, sort, page, per_page)
   * @returns Object berisi items (array wisata) dan metadata pagination
   */
  list: async (filters?: WisataFilter) => {
    const { data } = await apiClient.get<WisataListResponse>('/wisata', { params: filters })
    return {
      items: data.data,
      total: data.meta.total,
      total_pages: data.meta.last_page,
      page: data.meta.current_page,
      limit: data.meta.per_page,
    }
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