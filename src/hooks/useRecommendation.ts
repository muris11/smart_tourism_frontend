'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { recommendationApi } from '@/lib/api/recommendation'
import type { PlanningPayload } from '@/types'

interface PlanningResult {
    itinerary: PlanningDay[]
    total_budget: number
    total_durasi_jam: number
}

interface PlanningDay {
    hari: number
    tanggal: string
    items: PlanningItemDisplay[]
}

interface PlanningItemDisplay {
    urutan: number
    tipe_tempat: 'wisata' | 'kuliner' | 'nongkrong'
    tempat_kode: string
    nama: string
    estimasi_durasi_jam: number
    harga_estimasi: number
    catatan?: string
    alamat?: string | null
    rating?: number | null
    link_maps?: string | null
}

interface ApiResponseItem {
    kode: string
    nama: string
    tipe: string
    wilayah: string
    kecamatan: string | null
    alamat: string | null
    deskripsi: string | null
    rating_google: number | null
    harga_min: number
    harga_max: number
    link_google_maps: string | null
    skor_rekomendasi: number
}

interface ApiResponseDay {
    hari: number
    tanggal: string | null
    items: ApiResponseItem[]
}

interface ApiResponse {
    judul: string
    wilayah: string[]
    jumlah_hari: number
    estimasi_budget: number | null
    hari: ApiResponseDay[]
}

/** Hook untuk mengelola rekomendasi dan planning perjalanan */
export function useRecommendation() {
    const { user } = useAuthStore()
    const [planning, setPlanning] = useState<PlanningResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /**
     * Generate itinerary / rencana perjalanan berdasarkan payload
     * @param payload - Parameter planning (wilayah, jumlah_hari, budget, preferensi)
     */
    const generatePlanning = async (payload: PlanningPayload) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await recommendationApi.planning(payload)
            const data = response as unknown as ApiResponse

            if (data && data.hari && data.hari.length > 0) {
                const itinerary: PlanningDay[] = data.hari.map((day: ApiResponseDay) => {
                    const normalizeTipe = (tipe: string): 'wisata' | 'kuliner' | 'nongkrong' => {
                        if (tipe === 'kuliner') return 'kuliner'
                        if (tipe === 'nongkrong') return 'nongkrong'
                        return 'wisata'
                    }

                    return {
                        hari: day.hari,
                        tanggal: day.tanggal || `Hari ${day.hari}`,
                        items: day.items.map((item: ApiResponseItem, itemIndex: number) => ({
                            urutan: itemIndex + 1,
                            tipe_tempat: normalizeTipe(item.tipe),
                            tempat_kode: item.kode,
                            nama: item.nama,
                            estimasi_durasi_jam: 2,
                            harga_estimasi: item.harga_min || 0,
                            catatan: item.deskripsi || undefined,
                            alamat: item.alamat,
                            rating: item.rating_google,
                            link_maps: item.link_google_maps,
                        })),
                    }
                })

                const total_budget = itinerary.reduce((sum: number, day: PlanningDay) => {
                    return sum + day.items.reduce((s: number, item: PlanningItemDisplay) => {
                        return s + (item.harga_estimasi || 0)
                    }, 0)
                }, 0)

                const total_durasi_jam = itinerary.reduce((sum: number, day: PlanningDay) => {
                    return sum + day.items.reduce((s: number) => s + 2, 0)
                }, 0)

                setPlanning({ itinerary, total_budget, total_durasi_jam })
            } else {
                setPlanning(null)
            }
        } catch (err) {
            console.error('Planning error:', err)
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Track history user untuk rekomendasi personal
     * @param tipe_tempat - Jenis tempat (wisata, kuliner, nongkrong)
     * @param tempat_kode - Kode unik tempat
     * @param aksi - Jenis interaksi (klik, kunjungi, simpan, rating, share)
     * @param nilai_rating - Nilai rating (1-5) jika aksi = rating
     * @param durasi_detik - Durasi user di halaman (opsional)
     */
    const trackHistory = async (
        tipe_tempat: 'wisata' | 'kuliner' | 'nongkrong',
        tempat_kode: string,
        aksi: 'klik' | 'kunjungi' | 'simpan' | 'rating' | 'share',
        nilai_rating?: number,
        durasi_detik?: number
    ) => {
        if (!user) return

        try {
            await recommendationApi.trackHistory({
                user_id: user.id,
                tipe_tempat,
                tempat_kode,
                aksi,
                nilai_rating: nilai_rating || null,
                durasi_detik: durasi_detik || null,
            })
        } catch (error) {
            console.error('Failed to track history:', error)
        }
    }

    return { planning, isLoading, error, generatePlanning, trackHistory }
}