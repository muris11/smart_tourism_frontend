import { Wilayah } from '@/lib/constants/wilayah'
import type { Status } from '@/lib/constants/status'
import type { Sentimen } from '@/lib/constants/sentimen'
import { Koordinat } from './koordinat'

/** Item kuliner untuk list */
export interface KulinerItem {
  id: number
  uid: string
  kode: string
  nama: string
  wilayah: Wilayah
  kecamatan: string | null
  alamat_lengkap: string | null
  koordinat: Koordinat | null
  jenis_tempat: string | null
  kategori_menu_utama: string | null
  menu_unggulan: string | null
  makanan_khas_daerah: boolean
  nama_makanan_khas: string | null
  harga_menu_min: number
  harga_menu_max: number
  jam_buka: string | null
  jam_tutup: string | null
  kapasitas_orang: number | null
  fasilitas: string[]
  sertifikat_halal: boolean
  rating_google: number | null
  jumlah_ulasan_google: number
  link_google_maps: string | null
  kontak: string | null
  gambar: string[]
  gambar_utama: string | null
  status: Status
  sentimen: Sentimen | null
  skor_sentimen: number | null
  total_ulasan_scraped: number
  total_positif: number
  total_negatif: number
  created_at: string
  updated_at: string
}

/** Detail lengkap kuliner */
export interface KulinerDetail extends Omit<KulinerItem, 'id' | 'uid' | 'status' | 'created_at' | 'updated_at'> {
  id_wisata_terdekat: string | null
  sumber_data: string | null
  catatan: string | null
}

/** Filter untuk list kuliner (match backend Laravel) */
export interface KulinerFilter {
  wilayah?: Wilayah
  jenis?: string
  sentimen?: string
  q?: string
  sort?: 'rating' | 'terbaru' | 'nama'
  per_page?: number
  page?: number
}

/** Response dari endpoint list kuliner (Laravel) */
export interface KulinerListResponse {
  success: boolean
  message: string
  data: KulinerItem[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number | null
    to: number | null
  }
}

/** Response dari endpoint detail kuliner (FastAPI) */
export interface KulinerDetailResponse {
  success: boolean
  message: string
  data: KulinerDetail
}