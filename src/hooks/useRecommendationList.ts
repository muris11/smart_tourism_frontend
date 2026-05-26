// src/hooks/useRecommendationList.ts

'use client'

import useSWR from 'swr'
import { recommendationApi } from '@/lib/api/recommendation'
import type { RecommendationItem, RecommendationPayload } from '@/types'
import type { Wilayah } from '@/lib/constants/wilayah'

interface UseRecommendationParams {
    mode?: 'personal' | 'popular' | 'nearby'
    wilayah?: Wilayah[]
    kategori?: string[]
    budget_max?: number
    tipe?: 'wisata' | 'kuliner' | 'nongkrong' | 'all'
    jumlah?: number
    latitude?: number
    longitude?: number
}

interface UseRecommendationReturn {
    data: RecommendationItem[]
    mode: string
    total: number
    isLoading: boolean
    isError: boolean
    error: Error | null
    mutate: () => void
}

export function useRecommendationList(params?: UseRecommendationParams): UseRecommendationReturn {
    const key = params ? ['recommendation', JSON.stringify(params)] : ['recommendation']

    const payload: RecommendationPayload = {
        mode: params?.mode || 'personal',
        jumlah: params?.jumlah || 10,
        wilayah: params?.wilayah,
        kategori: params?.kategori,
        budget_max: params?.budget_max,
        tipe: params?.tipe || 'all',
        latitude: params?.latitude,
        longitude: params?.longitude,
    }

    const { data, error, isLoading, mutate } = useSWR(
        key,
        () => recommendationApi.get(payload),
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )

    return {
        data: (data?.items as RecommendationItem[]) ?? [],
        mode: data?.mode || 'personal',
        total: data?.total || 0,
        isLoading,
        isError: !!error,
        error: error as Error | null,
        mutate,
    }
}

/** Rekomendasi personal untuk wisata */
export function usePersonalWisataRecommendations(limit: number = 4): UseRecommendationReturn {
    return useRecommendationList({
        mode: 'personal',
        tipe: 'wisata',
        jumlah: limit,
    })
}

/** Rekomendasi personal untuk kuliner */
export function usePersonalKulinerRecommendations(limit: number = 4): UseRecommendationReturn {
    return useRecommendationList({
        mode: 'personal',
        tipe: 'kuliner',
        jumlah: limit,
    })
}

/** Rekomendasi personal untuk nongkrong */
export function usePersonalNongkrongRecommendations(limit: number = 4): UseRecommendationReturn {
    return useRecommendationList({
        mode: 'personal',
        tipe: 'nongkrong',
        jumlah: limit,
    })
}