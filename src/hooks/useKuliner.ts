'use client'

import useSWR from 'swr'
import { kulinerApi } from '@/lib/api/kuliner'
import { ListFilter } from '@/types/api'

export function useKulinerList(filters: ListFilter & { jenis?: string }) {
  const key = ['kuliner', JSON.stringify(filters)]
  const { data, error, isLoading } = useSWR(key, () => kulinerApi.list(filters), {
    revalidateOnFocus: false,
  })

  return { data: data?.data ?? [], meta: data?.meta, isLoading, isError: !!error }
}

export function useKulinerDetail(kode: string) {
  const { data, error, isLoading } = useSWR(
    kode ? `kuliner-detail-${kode}` : null,
    () => kulinerApi.detail(kode)
  )
  return { kuliner: data, isLoading, isError: !!error }
}
