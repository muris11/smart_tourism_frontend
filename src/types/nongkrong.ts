import { Koordinat } from './wisata'

export interface NongkrongItem {
  kode: string
  nama: string
  wilayah: string
  tipe: string
  gambar: string | null
  rating: number
  sentimen: 'positif' | 'negatif' | 'belum_dianalisis'
  sentimen_positif_pct: number
  alamat: string | null
  range_harga: string | null
  ada_wifi: boolean
  ada_colokan: boolean
}

export interface NongkrongDetail extends NongkrongItem {
  deskripsi: string | null
  koordinat: Koordinat | null
  jam_buka: string | null
  no_telepon: string | null
  jumlah_ulasan: number
  fasilitas: string[] | null
  maps_url: string | null
}
