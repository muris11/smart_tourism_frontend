'use client'

import useSWR from 'swr'
import { kulinerApi } from '@/lib/api/kuliner'
import type { KulinerItem, KulinerDetail, KulinerFilter } from '@/types'

/** Hook untuk mendapatkan daftar kuliner dengan filter */
export function useKuliner(params?: KulinerFilter) {
  const key = params ? ['kuliner', JSON.stringify(params)] : ['kuliner']

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => kulinerApi.list(params || {}),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  )

  return {
    data: (data?.items as KulinerItem[]) ?? [],
    meta: {
      current_page: data?.page || 1,
      per_page: data?.limit || 10,
      total: data?.total || 0,
      last_page: data?.total_pages || 1,
    },
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}

/**
 * Hook untuk mendapatkan detail kuliner berdasarkan kode
 * @param kode - Kode unik kuliner (contoh: KUL-CRB-001)
 */
export function useKulinerDetail(kode: string) {
  const { data, error, isLoading } = useSWR(
    kode ? `kuliner-detail-${kode}` : null,
    () => kulinerApi.detail(kode),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  )

  return {
    kuliner: data as KulinerDetail | null,
    isLoading,
    isError: !!error,
    error,
  }
}

/**
 * Hook untuk mendapatkan kuliner unggulan (rating tertinggi)
 * @param limit - Jumlah data yang diambil (default: 4)
 */
export function useFeaturedKuliner(per_page: number = 4) {
  return useKuliner({
    per_page,
    sort: 'rating',
  })
}