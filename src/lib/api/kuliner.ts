import { apiClient } from './client'
import {
  KulinerDetail,
  KulinerFilter,
  KulinerListResponse,
  KulinerDetailResponse
} from '@/types'

export const kulinerApi = {
  /**
   * Daftar semua kuliner (publik)
   * GET /api/v1/kuliner/
   * 
   * @param filters - Filter untuk list kuliner (wilayah, jenis, sentimen, halal, q, sort_by, order, page, limit)
   */
  list: async (filters?: KulinerFilter): Promise<KulinerListResponse['data']> => {
    const { data } = await apiClient.get<KulinerListResponse>('/kuliner', { params: filters })
    return data.data
  },

  /**
   * Detail kuliner berdasarkan kode
   * GET /api/v1/kuliner/{kode}
   * 
   * @param kode - Kode unik kuliner (contoh: KUL-CRB-001)
   */
  detail: async (kode: string): Promise<KulinerDetail> => {
    const { data } = await apiClient.get<KulinerDetailResponse>(`/kuliner/${kode}`)
    return data.data
  },
}