import { apiClient } from './client'
import type {
  NongkrongDetail,
  NongkrongFilter,
  NongkrongListResponse,
  NongkrongDetailResponse
} from '@/types'

export const nongkrongApi = {
  /**
   * Daftar semua tempat nongkrong (publik)
   * GET /api/v1/nongkrong/
   * 
   * @param filters - Filter untuk list nongkrong (wilayah, sentimen, q, sort_by, order, page, limit)
   */
  list: async (filters?: NongkrongFilter): Promise<NongkrongListResponse['data']> => {
    const { data } = await apiClient.get<NongkrongListResponse>('/nongkrong', { params: filters })
    return data.data
  },

  /**
   * Detail tempat nongkrong berdasarkan kode
   * GET /api/v1/nongkrong/{kode}
   * 
   * @param kode - Kode unik tempat nongkrong (contoh: NGK-CRB-001)
   */
  detail: async (kode: string): Promise<NongkrongDetail> => {
    const { data } = await apiClient.get<NongkrongDetailResponse>(`/nongkrong/${kode}`)
    return data.data
  },
}