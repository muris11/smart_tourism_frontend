import { KulinerItem } from './kuliner'
import { NongkrongItem } from './nongkrong'
import { WisataItem } from './wisata'

export type RekoItem = (WisataItem | KulinerItem | NongkrongItem) & {
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  skor_rekomendasi?: number
  jarak_km?: number
}

export interface RecommendationPayload {
  mode?: 'personal' | 'nearby' | 'popular'
  wilayah?: string
  tipe?: 'wisata' | 'kuliner' | 'nongkrong'
  kategori?: string
  latitude?: number
  longitude?: number
  limit?: number
}

export interface PlanningPayload {
  jumlah_hari: number
  wilayah: string[]
  preferensi?: string[]
  budget?: 'murah' | 'sedang' | 'mahal'
  latitude?: number
  longitude?: number
}

export interface PlanningDay {
  hari: number
  tempat: RekoItem[]
}

export interface PlanningResult {
  total_hari: number
  itinerary: PlanningDay[]
}
