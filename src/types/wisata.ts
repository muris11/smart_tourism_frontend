import { Wilayah } from '@/lib/constants/wilayah'
import type { Status } from '@/lib/constants/status'
import type { Sentimen } from './sentiment'

/** Koordinat lokasi */
export interface Koordinat {
  lat: number
  lng: number
}

/** Item wisata untuk list (match response Laravel) */
export interface WisataItem {
  id: number
  uid: string
  kode: string
  nama: string
  wilayah: Wilayah
  kecamatan: string | null
  alamat_lengkap: string | null
  koordinat: Koordinat | null
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
  gambar_utama: string | null
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

/** Detail wisata */
export interface WisataDetail extends WisataItem {}

/** Filter untuk list wisata (match backend Laravel) */
export interface WisataFilter {
  kategori_utama?: string
  wilayah?: Wilayah
  sentimen?: Sentimen
  q?: string
  sort?: 'rating' | 'terbaru' | 'nama'
  per_page?: number
  page?: number
}

/** Response dari endpoint list wisata (Laravel) */
export interface WisataListResponse {
  success: boolean
  message: string
  data: WisataItem[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number | null
    to: number | null
  }
}

/** Response dari endpoint detail wisata (FastAPI) */
export interface WisataDetailResponse {
  success: boolean
  message: string
  data: WisataDetail
}