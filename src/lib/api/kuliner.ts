import { apiClient } from './client'
import { makeBrowserCacheKey, withBrowserCache } from '@/lib/cache/browserStorage'
import {
  KulinerDetail,
  KulinerFilter,
  KulinerListResponse,
  KulinerDetailResponse
} from '@/types'

const PUBLIC_LIST_TTL = 30 * 60 * 1000

function shouldCacheList(filters?: KulinerFilter) {
  return !filters?.q && (filters?.per_page ?? 10) <= 100
}

export const kulinerApi = {
  /**
   * Daftar semua kuliner (publik)
   * GET /api/v1/kuliner/
   * 
   * @param filters - Filter untuk list kuliner (wilayah, jenis, sentimen, q, sort, page, per_page)
   */
  list: async (filters?: KulinerFilter) => {
    const fetchList = async () => {
      const { data } = await apiClient.get<KulinerListResponse>('/kuliner', { params: filters })
      return {
        items: data.data,
        total: data.meta.total,
        total_pages: data.meta.last_page,
        page: data.meta.current_page,
        limit: data.meta.per_page,
      }
    }

    if (!shouldCacheList(filters)) {
      return fetchList()
    }

    return withBrowserCache(
      makeBrowserCacheKey('kuliner:list', filters),
      PUBLIC_LIST_TTL,
      fetchList
    )
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
