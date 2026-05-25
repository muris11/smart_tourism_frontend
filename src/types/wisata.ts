import { Wilayah } from '@/lib/constants/wilayah'
import type { Status } from '@/lib/constants/status'
import type { Sentimen } from '@/lib/constants/sentimen'

/** Koordinat lokasi */
export interface Koordinat {
  lat: number
  lng: number
}

/** Item wisata untuk list (match response FastAPI) */
export interface WisataItem {
  id: number
  uid: string
  kode: string
  nama: string
  wilayah: Wilayah
  kecamatan: string | null
  alamat_lengkap: string | null
  latitude: number | null
  longitude: number | null
  kategori_utama: string | null
  sub_kategori: string | null
  jenis_tempat: string | null
  deskripsi: string | null
  harga_tiket_min: number
  harga_tiket_max: number
  gratis: boolean
  jam_buka: string | null
  jam_tutup: string | null
  hari_libur_operasional: string | null
  estimasi_durasi_jam: number | null
  fasilitas: string[]
  aksesibilitas: string | null
  moda_transportasi: string | null
  rating_google: number | null
  jumlah_ulasan_google: number
  link_google_maps: string | null
  link_instagram: string | null
  link_website: string | null
  kontak: string | null
  gambar: string[]
  sumber_data: string | null
  status: Status
  sentimen: Sentimen | null
  skor_sentimen: number | null
  total_ulasan_scraped: number
  total_positif: number
  total_negatif: number
  created_at: string
  updated_at: string
}

/** Detail wisata (FastAPI tidak memisahkan list dan detail) */
export interface WisataDetail extends WisataItem {
  koordinat?: Koordinat | null
}

/** Filter untuk list wisata (match query params FastAPI) */
export interface WisataFilter {
  jenis?: string
  kategori?: string
  sentimen?: Sentimen
  q?: string
  sort_by?: 'rating' | 'sentimen'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/** Response dari endpoint list wisata (FastAPI) */
export interface WisataListResponse {
  success: boolean
  message: string
  data: {
    items: WisataItem[]
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

/** Response dari endpoint detail wisata (FastAPI) */
export interface WisataDetailResponse {
  success: boolean
  message: string
  data: WisataDetail
}