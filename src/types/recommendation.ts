// src/types/recommendation.ts

import { Wilayah } from '@/lib/constants/wilayah'

/** Item hasil rekomendasi */
export interface RecommendationItem {
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: Wilayah
  rating_google: number | null
  harga_min: number
  jarak_km?: number | null
  skor_relevansi: number
  gambar: string[]
  deskripsi?: string | null
}

/** Request payload untuk rekomendasi */
export interface RecommendationPayload {
  user_id?: string | null
  latitude?: number | null
  longitude?: number | null
  wilayah?: Wilayah[] | null
  kategori?: string[] | null
  budget_max?: number | null
  tipe?: 'wisata' | 'kuliner' | 'nongkrong' | 'all'
  jumlah?: number
  mode?: 'personal' | 'popular' | 'nearby'
}

/** Response dari backend FastAPI untuk rekomendasi */
export interface RecommendationResponse {
  success: boolean
  message: string
  data: {
    recommendations: RecommendationItem[]
    mode: string
    total: number
  }
}

/** Request payload untuk planning itinerary */
export interface PlanningPayload {
  user_id?: string | null
  wilayah: Wilayah[]
  jumlah_hari: number
  jumlah_orang?: number
  budget_total?: number | null
  preferensi?: string[] | null
  tanggal_mulai?: string | null
  catatan_tambahan?: string | null
}

/** Item dalam satu hari itinerary (display) */
export interface PlanningItemDisplay {
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

/** Satu hari dalam itinerary */
export interface PlanningDay {
  hari: number
  tanggal: string
  items: PlanningItemDisplay[]
}

/** Response dari backend FastAPI untuk planning */
export interface PlanningResponse {
  success: boolean
  message: string
  data: {
    itinerary: PlanningDay[]
    total_budget: number
    total_durasi_jam: number
  }
}

/** Result untuk frontend (sama dengan data di PlanningResponse) */
export interface PlanningResult {
  itinerary: PlanningDay[]
  total_budget: number
  total_durasi_jam: number
}

/** Request payload untuk track history */
export interface TrackHistoryPayload {
  user_id: string
  tipe_tempat: 'wisata' | 'kuliner' | 'nongkrong'
  tempat_kode: string
  aksi: 'klik' | 'kunjungi' | 'simpan' | 'rating' | 'share'
  nilai_rating?: number | null
  durasi_detik?: number | null
}