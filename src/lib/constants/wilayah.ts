/** Wilayah di Ciayumajakuning */
export type Wilayah = 'Indramayu' | 'Cirebon' | 'Majalengka' | 'Kuningan'

/** Daftar semua wilayah */
export const WILAYAH_LIST: Wilayah[] = ['Indramayu', 'Cirebon', 'Majalengka', 'Kuningan']

/** Label wilayah untuk tampilan */
export const WILAYAH_LABEL: Record<Wilayah, string> = {
  Indramayu: 'Indramayu',
  Cirebon: 'Cirebon',
  Majalengka: 'Majalengka',
  Kuningan: 'Kuningan',
}

/** Warna untuk setiap wilayah (opsional, buat UI) */
export const WILAYAH_COLOR: Record<Wilayah, string> = {
  Indramayu: 'bg-blue-500',
  Cirebon: 'bg-green-500',
  Majalengka: 'bg-purple-500',
  Kuningan: 'bg-orange-500',
}

/** Center koordinat setiap wilayah */
export const WILAYAH_CENTER: Record<Wilayah, { lat: number; lon: number }> = {
  Indramayu: { lat: -6.3277, lon: 108.3246 },
  Cirebon: { lat: -6.7063, lon: 108.557 },
  Majalengka: { lat: -6.8365, lon: 108.2273 },
  Kuningan: { lat: -6.9764, lon: 108.4743 },
}