'use client'

import useSWR from 'swr'
import { nongkrongApi } from '@/lib/api/nongkrong'
import type { NongkrongItem, NongkrongDetail, NongkrongFilter } from '@/types'

/** Hook untuk mendapatkan daftar tempat nongkrong dengan filter */
export function useNongkrong(params?: NongkrongFilter) {
  const key = params ? ['nongkrong', JSON.stringify(params)] : ['nongkrong']

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => nongkrongApi.list(params || {}),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  )

  return {
    data: (data?.items as NongkrongItem[]) ?? [],
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
 * Hook untuk mendapatkan detail tempat nongkrong berdasarkan kode
 * @param kode - Kode unik tempat nongkrong (contoh: NGK-CRB-001)
 */
export function useNongkrongDetail(kode: string) {
  const { data, error, isLoading } = useSWR(
    kode ? `nongkrong-detail-${kode}` : null,
    () => nongkrongApi.detail(kode),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  )

  return {
    nongkrong: data as NongkrongDetail | null,
    isLoading,
    isError: !!error,
    error,
  }
}

/**
 * Hook untuk mendapatkan tempat nongkrong unggulan (rating tertinggi)
 * @param limit - Jumlah data yang diambil (default: 4)
 */
export function useFeaturedNongkrong(per_page: number = 4) {
  return useNongkrong({
    per_page,
    sort: 'rating',
  })
}