import { Wilayah } from '@/lib/constants/wilayah'
import type { Status } from '@/lib/constants/status'
import type { Sentimen } from '@/lib/constants/sentimen'
import { Koordinat } from './koordinat'

/** Item nongkrong untuk list */
export interface NongkrongItem {
  id: number
  uid: string
  kode: string
  nama: string
  wilayah: Wilayah
  kecamatan: string | null
  alamat_lengkap: string | null
  latitude: number | null
  longitude: number | null
  id_wisata_ref: string | null
  konsep_suasana: string | null
  target_pengunjung: string | null
  cocok_untuk: string | null
  menu_best_seller: string | null
  harga_menu_min: number
  harga_menu_max: number
  jam_buka: string | null
  jam_tutup: string | null
  kapasitas_orang: number | null
  fasilitas: string[]
  batas_waktu_duduk: string | null
  rating_google: number | null
  minimal_order: number
  link_google_maps: string | null
  kontak: string | null
  gambar: string[]
  status: Status
  sentimen: Sentimen | null
  skor_sentimen: number | null
  total_ulasan_scraped: number
  total_positif: number
  total_negatif: number
  jumlah_ulasan_google: number
  created_at: string
  updated_at: string
}

/** Detail lengkap nongkrong */
export interface NongkrongDetail extends Omit<NongkrongItem, 'id' | 'uid' | 'status' | 'created_at' | 'updated_at'> {
  sumber_data: string | null
  catatan: string | null
  koordinat: Koordinat | null
}

/** Filter untuk list nongkrong */
export interface NongkrongFilter {
  wilayah?: Wilayah
  sentimen?: string
  q?: string
  sort_by?: 'rating' | 'sentimen'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/** Response dari endpoint list nongkrong (FastAPI) */
export interface NongkrongListResponse {
  success: boolean
  message: string
  data: {
    items: NongkrongItem[]
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

/** Response dari endpoint detail nongkrong (FastAPI) */
export interface NongkrongDetailResponse {
  success: boolean
  message: string
  data: NongkrongDetail
}