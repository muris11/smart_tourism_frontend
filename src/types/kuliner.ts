import { Koordinat } from './wisata'

export interface KulinerItem {
  kode: string
  nama: string
  wilayah: string
  jenis: string
  gambar: string | null
  rating: number
  sentimen: 'positif' | 'negatif' | 'belum_dianalisis'
  sentimen_positif_pct: number
  alamat: string | null
  range_harga: string | null
}

export interface KulinerDetail extends KulinerItem {
  kategori_makanan: string | null
  deskripsi: string | null
  koordinat: Koordinat | null
  jam_buka: string | null
  no_telepon: string | null
  jumlah_ulasan: number
  menu_unggulan: string[] | null
  maps_url: string | null
}
