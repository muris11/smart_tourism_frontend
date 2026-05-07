export interface Koordinat {
  lat: number
  lng: number
}

export interface WisataItem {
  kode: string
  nama: string
  wilayah: string
  kategori: string
  gambar: string | null
  rating: number
  sentimen: 'positif' | 'negatif' | 'belum_dianalisis'
  sentimen_positif_pct: number
  alamat: string | null
  harga_tiket: string | null
}

export interface WisataDetail extends WisataItem {
  deskripsi: string | null
  koordinat: Koordinat | null
  jam_buka: string | null
  no_telepon: string | null
  website: string | null
  jumlah_ulasan: number
  fasilitas: string[] | null
  maps_url: string | null
}
