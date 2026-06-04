import type { MetadataRoute } from 'next'
import { getDestinations, getCulinary, getHangouts } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://smart-tourism-citra.web.id'

  // Main static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/wisata`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/kuliner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/nongkrong`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/planning`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/rekomendasi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/syarat-ketentuan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/kebijakan-privasi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  let wisataRoutes: MetadataRoute.Sitemap = []
  let kulinerRoutes: MetadataRoute.Sitemap = []
  let nongkrongRoutes: MetadataRoute.Sitemap = []

  try {
    const listWisata = await getDestinations()
    wisataRoutes = listWisata.map((item) => ({
      url: `${baseUrl}/wisata/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Failed to generate sitemap for wisata:', e)
  }

  try {
    const listKuliner = await getCulinary()
    kulinerRoutes = listKuliner.map((item) => ({
      url: `${baseUrl}/kuliner/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Failed to generate sitemap for kuliner:', e)
  }

  try {
    const listNongkrong = await getHangouts()
    nongkrongRoutes = listNongkrong.map((item) => ({
      url: `${baseUrl}/nongkrong/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Failed to generate sitemap for nongkrong:', e)
  }

  return [...staticRoutes, ...wisataRoutes, ...kulinerRoutes, ...nongkrongRoutes]
}
