// src/types/recommendation.ts

import { Wilayah } from '@/lib/constants/wilayah'

/** Item hasil rekomendasi dari endpoint POST /recommendation */
export interface RekoItem {
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: string
  skor_rekomendasi?: number
  jarak_km?: number
}

/** Item hasil rekomendasi */
export interface RecommendationItem {
  id: number
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: Wilayah
  kecamatan: string
  alamat: string | null
  latitude: number | null
  longitude: number | null
  deskripsi: string | null
  rating_google: number | null
  harga_min: number
  harga_max: number
  gambar: string[]
  link_google_maps: string | null
  sentimen: string | null
  skor_sentimen: number
  skor_rekomendasi: number
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

/** Response dari backend Laravel untuk rekomendasi */
export interface RecommendationResponse {
  success: boolean
  message: string
  data: {
    items: RecommendationItem[]
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
  budget?: number | null
  kategori_preferensi?: string[] | null
  tanggal_mulai?: string | null
  catatan_tambahan?: string | null
}

/** Tempat dalam satu hari itinerary */
export interface PlanningItem {
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: string
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
  tempat: PlanningItem[]
}

/** Response dari backend FastAPI untuk planning */
export interface PlanningResponse {
  success: boolean
  message: string
  data: {
    itinerary: PlanningDay[]
    total_hari?: number
    total_budget: number
    total_durasi_jam: number
  }
}

/** Result untuk frontend (sama dengan data di PlanningResponse) */
export interface PlanningResult {
  itinerary: PlanningDay[]
  total_hari?: number
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