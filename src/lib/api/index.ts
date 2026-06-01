import { wisataApi } from './wisata'
import { kulinerApi } from './kuliner'
import { nongkrongApi } from './nongkrong'
import { WILAYAH_CENTER } from '@/lib/constants/wilayah'
import type { WisataItem, KulinerItem, NongkrongItem } from '@/types'

export interface RegionImage {
  src: string
  alt: string
}

export interface Region {
  id: string
  name: string
  slug: string
  description: string
  image: RegionImage
  destinationCount: string
  imageTheme: string
  coordinates?: { lat: number; lng: number }
}

export interface DestinationImage {
  src: string
  alt: string
}

export interface Destination {
  id: string
  slug: string
  name: string
  region: string
  category: string
  rating: number
  address: string
  images: DestinationImage[]
  featured: boolean
  jamBuka?: string
  hargaTiket?: string
  tips?: string[]
  description?: string
  priceRange?: string
  hours?: string
}

export interface Culinary {
  id: string
  slug: string
  name: string
  region: string
  category: string
  rating: number
  description: string
  address: string
  images: DestinationImage[]
  priceRange: string
  hours: string
  featured: boolean
  ambience?: string
}

export interface Hangout {
  id: string
  slug: string
  name: string
  region: string
  category: string
  rating: number
  description: string
  address: string
  images: DestinationImage[]
  ambience: string
  priceRange: string
  hours: string
  featured: boolean
  tags: string[]
}

export interface HeroSlide {
  id: string
  region: string
  src: string
  alt: string
}

export interface Stat {
  label: string
  value: string
  isPrototype: boolean
}

export interface HiddenGem {
  id: string
  label: string
  region: string
  src: string
  alt: string
}

export interface HomepageData {
  heroSlides: HeroSlide[]
  stats: Stat[]
  hiddenGems: HiddenGem[]
}

function formatPrice(min: number, max: number, gratis: boolean): string {
  if (gratis) return 'Gratis'
  const fmt = (n: number) => `Rp${n.toLocaleString('id-ID')}`
  return min === max ? fmt(min) : `${fmt(min)} - ${fmt(max)}`
}

function makeImages(gambar: string[], alt: string): DestinationImage[] {
  if (!gambar || gambar.length === 0) {
    return [{ src: '/images/fallback/fallback-1.jpg', alt }]
  }
  return gambar.map((src) => ({ src, alt }))
}

function wisataToDestination(item: WisataItem): Destination {
  return {
    id: item.kode,
    slug: item.kode.toLowerCase(),
    name: item.nama,
    region: item.wilayah,
    category: item.kategori_utama || item.jenis_tempat || objWisataKategori(item),
    rating: item.rating_google ?? 0,
    address: item.alamat_lengkap || '',
    images: makeImages(item.gambar || [], item.nama),
    featured: (item.rating_google ?? 0) >= 4.3,
    jamBuka: item.jam_buka && item.jam_tutup ? `${item.jam_buka} - ${item.jam_tutup}` : undefined,
    hargaTiket: formatPrice(item.harga_tiket_min, item.harga_tiket_max, item.gratis),
    tips: item.fasilitas?.length ? item.fasilitas.slice(0, 5) : undefined,
    description: item.deskripsi || '',
    priceRange: formatPrice(item.harga_tiket_min, item.harga_tiket_max, item.gratis),
    hours: item.jam_buka && item.jam_tutup ? `${item.jam_buka} - ${item.jam_tutup}` : undefined,
  }
}

function objWisataKategori(item: WisataItem): string {
  if (item.kategori_utama) return item.kategori_utama
  const nama = (item.nama || '').toLowerCase()
  if (nama.includes('pantai') || nama.includes('curug') || nama.includes('air terjun')) return 'Alam'
  if (nama.includes('keraton') || nama.includes('museum') || nama.includes('cagar')) return 'Budaya'
  if (nama.includes('masjid') || nama.includes('makam')) return 'Religi'
  return 'Wisata'
}

function kulinerToCulinary(item: KulinerItem): Culinary {
  return {
    id: item.kode,
    slug: item.kode.toLowerCase(),
    name: item.nama,
    region: item.wilayah,
    category: item.kategori_menu_utama || item.jenis_tempat || 'Kuliner',
    rating: item.rating_google ?? 0,
    description: item.menu_unggulan || '',
    address: item.alamat_lengkap || '',
    images: makeImages(item.gambar || [], item.nama),
    priceRange: formatPrice(item.harga_menu_min, item.harga_menu_max, false),
    hours: item.jam_buka && item.jam_tutup ? `${item.jam_buka} - ${item.jam_tutup}` : '',
    featured: (item.rating_google ?? 0) >= 4.3,
    ambience: '',
  }
}

function nongkrongToHangout(item: NongkrongItem): Hangout {
  return {
    id: item.kode,
    slug: item.kode.toLowerCase(),
    name: item.nama,
    region: item.wilayah,
    category: item.konsep_suasana || item.cocok_untuk || 'Nongkrong',
    rating: item.rating_google ?? 0,
    description: item.menu_best_seller || '',
    address: item.alamat_lengkap || '',
    images: makeImages(item.gambar || [], item.nama),
    ambience: item.konsep_suasana || '',
    priceRange: formatPrice(item.harga_menu_min, item.harga_menu_max, false),
    hours: item.jam_buka && item.jam_tutup ? `${item.jam_buka} - ${item.jam_tutup}` : '',
    featured: (item.rating_google ?? 0) >= 4.3,
    tags: item.fasilitas?.length ? item.fasilitas.slice(0, 5) : [],
  }
}

const REGION_META: Record<string, { description: string; image: string; theme: string }> = {
  Cirebon: {
    description: 'Kota Udang, pusat budaya dan kuliner khas Nusantara',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600',
    theme: 'budaya',
  },
  Indramayu: {
    description: 'Kota Mangga dengan pesona pantai dan alam asri',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    theme: 'pantai',
  },
  Majalengka: {
    description: 'Kota Kaki Gunung Ciremai dengan udara sejuk',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600',
    theme: 'alam',
  },
  Kuningan: {
    description: 'Kota Kuda dengan panorama pegunungan hijau',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
    theme: 'pegunungan',
  },
}

let cachedCounts: Record<string, number> | null = null

async function getWilayahCounts(): Promise<Record<string, number>> {
  if (cachedCounts) return cachedCounts
  try {
    const wisata = await wisataApi.list({ per_page: 1, page: 1 })
    const kuliner = await kulinerApi.list({ per_page: 1, page: 1 })
    const nongkrong = await nongkrongApi.list({ per_page: 1, page: 1 })
    cachedCounts = {
      wisata: wisata.total || 0,
      kuliner: kuliner.total || 0,
      nongkrong: nongkrong.total || 0,
    }
    return cachedCounts
  } catch {
    cachedCounts = { wisata: 0, kuliner: 0, nongkrong: 0 }
    return cachedCounts
  }
}

export async function getRegions(): Promise<Region[]> {
  let destinationCount = '50+ Destinasi'
  try {
    const counts = await getWilayahCounts()
    const total = (counts.wisata || 0) + (counts.kuliner || 0) + (counts.nongkrong || 0)
    destinationCount = `${total}+ Destinasi`
  } catch {
    // use default
  }

  return Object.entries(REGION_META).map(([name, meta]) => {
    const slug = name.toLowerCase()
    const center = WILAYAH_CENTER[name as keyof typeof WILAYAH_CENTER]
    return {
      id: slug,
      name,
      slug,
      description: meta.description,
      image: { src: meta.image, alt: name },
      destinationCount,
      imageTheme: meta.theme,
      coordinates: center ? { lat: center.lat, lng: center.lon } : undefined,
    }
  })
}

function dedupeBy<T>(arr: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>()
  return arr.filter((item) => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

async function fetchAllPages<T>(
  fetcher: (page: number) => Promise<{ items: T[]; total: number; total_pages: number }>,
): Promise<T[]> {
  const PER_PAGE = 50
  const first = await fetcher(1)
  const total = first.total || first.items.length
  const totalPages = Math.max(first.total_pages, Math.ceil(total / PER_PAGE))

  if (totalPages <= 1) return first.items as T[]

  const results = await Promise.allSettled(
    Array.from({ length: totalPages - 1 }, (_, i) => fetcher(i + 2))
  )

  const rest: T[] = []
  for (const r of results) {
    if (r.status === 'fulfilled') rest.push(...r.value.items)
  }

  return [...(first.items as T[]), ...rest]
}

let destPromise: Promise<Destination[]> | null = null
export function getDestinations(): Promise<Destination[]> {
  if (!destPromise) {
    destPromise = fetchAllPages((page) =>
      wisataApi.list({ page, per_page: 50 }).then((r) => ({
        items: r.items,
        total: r.total,
        total_pages: r.total_pages,
      }))
    ).then(all => dedupeBy(
      (all as WisataItem[]).map(wisataToDestination),
      (d) => d.id
    )).catch(err => { destPromise = null; throw err })
  }
  return destPromise
}

let culinaryPromise: Promise<Culinary[]> | null = null
export function getCulinary(): Promise<Culinary[]> {
  if (!culinaryPromise) {
    culinaryPromise = fetchAllPages((page) =>
      kulinerApi.list({ page, per_page: 50 }).then((r) => ({
        items: r.items,
        total: r.total,
        total_pages: r.total_pages,
      }))
    ).then(all => dedupeBy(
      (all as KulinerItem[]).map(kulinerToCulinary),
      (c) => c.id
    )).catch(err => { culinaryPromise = null; throw err })
  }
  return culinaryPromise
}

let hangoutPromise: Promise<Hangout[]> | null = null
export function getHangouts(): Promise<Hangout[]> {
  if (!hangoutPromise) {
    hangoutPromise = fetchAllPages((page) =>
      nongkrongApi.list({ page, per_page: 50 }).then((r) => ({
        items: r.items,
        total: r.total,
        total_pages: r.total_pages,
      }))
    ).then(all => dedupeBy(
      (all as NongkrongItem[]).map(nongkrongToHangout),
      (h) => h.id
    )).catch(err => { hangoutPromise = null; throw err })
  }
  return hangoutPromise
}

let homepagePromise: Promise<HomepageData> | null = null
export function getHomepage(): Promise<HomepageData> {
  if (!homepagePromise) {
    homepagePromise = Promise.all([
      getDestinations(),
      getCulinary(),
      getHangouts(),
      getWilayahCounts(),
    ]).then(([destinations, culinary, hangouts, counts]) => {
      const wisataTotal = counts.wisata ?? destinations.length
      const kulinerTotal = counts.kuliner ?? culinary.length
      const nongkrongTotal = counts.nongkrong ?? hangouts.length

      const heroSlides: HeroSlide[] = destinations
        .filter((d) => d.images.length > 0)
        .slice(0, 4)
        .map((d) => ({
          id: d.id,
          region: d.region,
          src: d.images[0].src,
          alt: d.name,
        }))

      const stats: Stat[] = [
        { label: 'Tempat wisata terdaftar', value: `${wisataTotal.toLocaleString('id-ID')}`, isPrototype: false },
        { label: 'Restoran & tempat makan', value: `${kulinerTotal.toLocaleString('id-ID')}`, isPrototype: false },
        { label: 'Cafe & tempat hangout', value: `${nongkrongTotal.toLocaleString('id-ID')}`, isPrototype: false },
      ]

      const topDest = destinations.filter((d) => d.featured).slice(1, 4)
      const topCul = culinary.filter((c) => c.featured).slice(0, 2)
      const topHang = hangouts.filter((h) => h.featured).slice(0, 2)
      const hiddenGems: HiddenGem[] = [...topDest, ...topCul, ...topHang].slice(0, 6).map((item) => ({
        id: `gem-${item.id}`,
        label: item.name,
        region: item.region,
        src: item.images[0]?.src || '/images/fallback/fallback-1.jpg',
        alt: item.name,
      }))

      return { heroSlides, stats, hiddenGems }
    }).catch(err => { homepagePromise = null; throw err })
  }
  return homepagePromise
}

export async function getRegionBySlug(slug: string): Promise<Region | undefined> {
  const regions = await getRegions()
  return regions.find((r) => r.slug === slug)
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  const list = await getDestinations()
  return list.find((d) => d.slug === slug)
}

export async function getCulinaryBySlug(slug: string): Promise<Culinary | undefined> {
  const list = await getCulinary()
  return list.find((c) => c.slug === slug)
}

export async function getHangoutBySlug(slug: string): Promise<Hangout | undefined> {
  const list = await getHangouts()
  return list.find((h) => h.slug === slug)
}

export async function searchAll(query: string): Promise<{
  destinations: Destination[]
  culinary: Culinary[]
  hangouts: Hangout[]
}> {
  const q = query.toLowerCase()
  const [allDests, allCulinary, allHangouts] = await Promise.all([
    getDestinations(),
    getCulinary(),
    getHangouts(),
  ])

  return {
    destinations: allDests.filter((d) => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q)),
    culinary: allCulinary.filter((c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)),
    hangouts: allHangouts.filter((h) => h.name.toLowerCase().includes(q) || h.region.toLowerCase().includes(q)),
  }
}
