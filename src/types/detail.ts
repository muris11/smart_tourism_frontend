export interface DetailItem {
  id: string
  slug: string
  name: string
  region: string
  category: string
  rating: number
  address: string
  images: { src: string; alt: string }[]
  description?: string
  hours?: string
  priceRange?: string
  ambience?: string
  tips?: string[]
  featured?: boolean
}
