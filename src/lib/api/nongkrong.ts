import { apiClient } from './client'
import { makeBrowserCacheKey, withBrowserCache } from '@/lib/cache/browserStorage'
import type {
  NongkrongDetail,
  NongkrongFilter,
  NongkrongListResponse,
  NongkrongDetailResponse
} from '@/types'

const PUBLIC_LIST_TTL = 30 * 60 * 1000

function shouldCacheList(filters?: NongkrongFilter) {
  return !filters?.q && (filters?.per_page ?? 10) <= 100
}

export const nongkrongApi = {
  /**
   * Daftar semua tempat nongkrong (publik)
   * GET /api/v1/nongkrong/
   * 
   * @param filters - Filter untuk list nongkrong (wilayah, sentimen, q, sort, page, per_page)
   */
  list: async (filters?: NongkrongFilter) => {
    const fetchList = async () => {
      const { data } = await apiClient.get<NongkrongListResponse>('/nongkrong', { params: filters })
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
      makeBrowserCacheKey('nongkrong:list', filters),
      PUBLIC_LIST_TTL,
      fetchList
    )
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
