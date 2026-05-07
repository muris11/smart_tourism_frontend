export const WILAYAH = ['Cirebon', 'Indramayu', 'Majalengka', 'Kuningan'] as const
export type Wilayah = (typeof WILAYAH)[number]

export const WILAYAH_CENTER: Record<Wilayah, { lat: number; lon: number }> = {
  Cirebon: { lat: -6.7063, lon: 108.557 },
  Indramayu: { lat: -6.3277, lon: 108.3246 },
  Majalengka: { lat: -6.8365, lon: 108.2273 },
  Kuningan: { lat: -6.9764, lon: 108.4743 },
}
