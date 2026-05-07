export interface SentimentSummary {
  wilayah: string
  total_ulasan: number
  positif_count: number
  negatif_count: number
  positif_pct: number
  negatif_pct: number
  per_tipe: {
    wisata: { positif: number; negatif: number }
    kuliner: { positif: number; negatif: number }
    nongkrong: { positif: number; negatif: number }
  }
}
