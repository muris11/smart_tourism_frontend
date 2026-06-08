import {
  makeBrowserCacheKey,
  withBrowserCache,
} from "@/lib/cache/browserStorage";
import type { KulinerItem, NongkrongItem, WisataItem } from "@/types";
import { kulinerApi } from "./kuliner";
import { nongkrongApi } from "./nongkrong";
import { regionsApi } from "./regions";
import { wisataApi } from "./wisata";

export interface RegionImage {
  src: string;
  alt: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: RegionImage;
  destinationCount: string;
  imageTheme: string;
  coordinates?: { lat: number; lng: number };
}

export interface DestinationImage {
  src: string;
  alt: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  category: string;
  rating: number;
  address: string;
  images: DestinationImage[];
  featured: boolean;
  jamBuka?: string;
  hargaTiket?: string;
  tips?: string[];
  description?: string;
  priceRange?: string;
  hours?: string;
}

export interface Culinary {
  id: string;
  slug: string;
  name: string;
  region: string;
  category: string;
  rating: number;
  description: string;
  address: string;
  images: DestinationImage[];
  priceRange: string;
  hours: string;
  featured: boolean;
  ambience?: string;
}

export interface Hangout {
  id: string;
  slug: string;
  name: string;
  region: string;
  category: string;
  rating: number;
  description: string;
  address: string;
  images: DestinationImage[];
  ambience: string;
  priceRange: string;
  hours: string;
  featured: boolean;
  tags: string[];
}

export interface HeroSlide {
  id: string;
  region: string;
  src: string;
  alt: string;
}

export interface Stat {
  label: string;
  value: string;
  isPrototype: boolean;
}

export interface HiddenGem {
  id: string;
  label: string;
  region: string;
  src: string;
  alt: string;
}

export interface HomepageData {
  heroSlides: HeroSlide[];
  stats: Stat[];
  hiddenGems: HiddenGem[];
}

const HOME_HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-2",
    region: "Wisata Alam",
    src: "/images/hero/hero2.webp",
    alt: "Pemandangan wisata alam Ciayumajakuning",
  },
  {
    id: "hero-1",
    region: "Ciayumajakuning",
    src: "/images/hero/hero1.webp",
    alt: "Pemandangan hero Ciayumajakuning",
  },
  {
    id: "hero-3",
    region: "Kuliner Khas",
    src: "/images/hero/hero3.webp",
    alt: "Kuliner khas Ciayumajakuning",
  },
  {
    id: "hero-4",
    region: "Tempat Nongkrong",
    src: "/images/hero/hero4.webp",
    alt: "Suasana tempat nongkrong Ciayumajakuning",
  },
  {
    id: "hero-5",
    region: "Panorama",
    src: "/images/hero/hero5.webp",
    alt: "Panorama Ciayumajakuning",
  },
];

function formatPrice(min: number, max: number, gratis: boolean): string {
  if (gratis) return "Gratis";
  const fmt = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
  return min === max ? fmt(min) : `${fmt(min)} - ${fmt(max)}`;
}

function makeImages(gambar: string[], alt: string): DestinationImage[] {
  if (!gambar || gambar.length === 0) {
    return [{ src: "/images/fallback/fallback-1.jpg", alt }];
  }
  return gambar.map((src) => ({ src, alt }));
}

function wisataToDestination(item: WisataItem): Destination {
  return {
    id: item.kode,
    slug: item.kode.toLowerCase(),
    name: item.nama,
    region: item.wilayah,
    category:
      item.kategori_utama || item.jenis_tempat || objWisataKategori(item),
    rating: item.rating_google ?? 0,
    address: item.alamat_lengkap || "",
    images: makeImages(item.gambar || [], item.nama),
    featured: (item.rating_google ?? 0) >= 4.3,
    jamBuka:
      item.jam_buka && item.jam_tutup
        ? `${item.jam_buka} - ${item.jam_tutup}`
        : undefined,
    hargaTiket: formatPrice(
      item.harga_tiket_min,
      item.harga_tiket_max,
      item.gratis,
    ),
    tips: item.fasilitas?.length ? item.fasilitas.slice(0, 5) : undefined,
    description: item.deskripsi || "",
    priceRange: formatPrice(
      item.harga_tiket_min,
      item.harga_tiket_max,
      item.gratis,
    ),
    hours:
      item.jam_buka && item.jam_tutup
        ? `${item.jam_buka} - ${item.jam_tutup}`
        : undefined,
  };
}

function objWisataKategori(item: WisataItem): string {
  if (item.kategori_utama) return item.kategori_utama;
  const nama = (item.nama || "").toLowerCase();
  if (
    nama.includes("pantai") ||
    nama.includes("curug") ||
    nama.includes("air terjun")
  )
    return "Alam";
  if (
    nama.includes("keraton") ||
    nama.includes("museum") ||
    nama.includes("cagar")
  )
    return "Budaya";
  if (nama.includes("masjid") || nama.includes("makam")) return "Religi";
  return "Wisata";
}

function kulinerToCulinary(item: KulinerItem): Culinary {
  return {
    id: item.kode,
    slug: item.kode.toLowerCase(),
    name: item.nama,
    region: item.wilayah,
    category: item.kategori_menu_utama || item.jenis_tempat || "Kuliner",
    rating: item.rating_google ?? 0,
    description: item.menu_unggulan || "",
    address: item.alamat_lengkap || "",
    images: makeImages(item.gambar || [], item.nama),
    priceRange: formatPrice(item.harga_menu_min, item.harga_menu_max, false),
    hours:
      item.jam_buka && item.jam_tutup
        ? `${item.jam_buka} - ${item.jam_tutup}`
        : "",
    featured: (item.rating_google ?? 0) >= 4.3,
    ambience: "",
  };
}

function nongkrongToHangout(item: NongkrongItem): Hangout {
  return {
    id: item.kode,
    slug: item.kode.toLowerCase(),
    name: item.nama,
    region: item.wilayah,
    category: item.konsep_suasana || item.cocok_untuk || "Nongkrong",
    rating: item.rating_google ?? 0,
    description: item.menu_best_seller || "",
    address: item.alamat_lengkap || "",
    images: makeImages(item.gambar || [], item.nama),
    ambience: item.konsep_suasana || "",
    priceRange: formatPrice(item.harga_menu_min, item.harga_menu_max, false),
    hours:
      item.jam_buka && item.jam_tutup
        ? `${item.jam_buka} - ${item.jam_tutup}`
        : "",
    featured: (item.rating_google ?? 0) >= 4.3,
    tags: item.fasilitas?.length ? item.fasilitas.slice(0, 5) : [],
  };
}

const HOMEPAGE_TTL = 30 * 60 * 1000;

let regionsPromise: Promise<Region[]> | null = null;
export function getRegions(): Promise<Region[]> {
  if (!regionsPromise) {
    regionsPromise = withBrowserCache(
      makeBrowserCacheKey("homepage:regions:v2"),
      24 * 60 * 60 * 1000,
      async () => {
        const apiRegions = await regionsApi.list();
        return apiRegions.map((apiRegion) => {
          const slug = apiRegion.name.toLowerCase();
          const center = { lat: apiRegion.latitude, lon: apiRegion.longitude };

          let defaultImage = "/images/daerah/cirebon-kompresio.webp";
          let theme = "budaya";
          if (apiRegion.name.includes("Indramayu")) {
            defaultImage = "/images/daerah/indramayu-kompresio.webp";
            theme = "pantai";
          } else if (apiRegion.name.includes("Majalengka")) {
            defaultImage = "/images/daerah/majalengka-kompresio.webp";
            theme = "alam";
          } else if (apiRegion.name.includes("Kuningan")) {
            defaultImage = "/images/daerah/kuningan-kompresio.webp";
            theme = "pegunungan";
          }

          return {
            id: slug,
            name: apiRegion.name,
            slug,
            description:
              apiRegion.description || `Destinasi wisata ${apiRegion.name}`,
            image: { src: defaultImage, alt: apiRegion.name },
            destinationCount: "Jelajahi",
            imageTheme: theme,
            coordinates: center
              ? { lat: center.lat, lng: center.lon }
              : undefined,
          };
        });
      },
    ).catch((error) => {
      console.error("Error fetching regions:", error);
      regionsPromise = null;
      return [];
    });
  }

  return regionsPromise;
}

function dedupeBy<T>(arr: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

async function fetchAllPages<T>(
  fetcher: (
    page: number,
  ) => Promise<{ items: T[]; total: number; total_pages: number }>,
): Promise<T[]> {
  const PER_PAGE = 500;
  const first = await fetcher(1);
  const total = first.total || first.items.length;
  const totalPages = Math.max(first.total_pages, Math.ceil(total / PER_PAGE));

  if (totalPages <= 1) return first.items as T[];

  const results = await Promise.allSettled(
    Array.from({ length: totalPages - 1 }, (_, i) => fetcher(i + 2)),
  );

  const rest: T[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") rest.push(...r.value.items);
  }

  return [...(first.items as T[]), ...rest];
}

let destPromise: Promise<Destination[]> | null = null;
export function getDestinations(): Promise<Destination[]> {
  if (!destPromise) {
    destPromise = fetchAllPages((page) =>
      wisataApi.list({ page, per_page: 500 }).then((r) => ({
        items: r.items,
        total: r.total,
        total_pages: r.total_pages,
      })),
    )
      .then((all) =>
        dedupeBy((all as WisataItem[]).map(wisataToDestination), (d) => d.id),
      )
      .catch((err) => {
        destPromise = null;
        throw err;
      });
  }
  return destPromise;
}

const featuredDestinationPromises: Record<number, Promise<Destination[]>> = {};
export function getFeaturedDestinations(
  limit: number = 12,
): Promise<Destination[]> {
  if (!featuredDestinationPromises[limit]) {
    featuredDestinationPromises[limit] = withBrowserCache(
      makeBrowserCacheKey("homepage:featured-destinations", { limit }),
      HOMEPAGE_TTL,
      async () => {
        const result = await wisataApi.list({
          per_page: limit,
          sort: "rating",
        });
        const mapped = (result.items as WisataItem[]).map(wisataToDestination);
        const featured = mapped.filter((item) => item.featured);
        return (featured.length ? featured : mapped).slice(0, limit);
      },
    ).catch((err) => {
      delete featuredDestinationPromises[limit];
      throw err;
    });
  }
  return featuredDestinationPromises[limit];
}

let culinaryPromise: Promise<Culinary[]> | null = null;
export function getCulinary(): Promise<Culinary[]> {
  if (!culinaryPromise) {
    culinaryPromise = fetchAllPages((page) =>
      kulinerApi.list({ page, per_page: 500 }).then((r) => ({
        items: r.items,
        total: r.total,
        total_pages: r.total_pages,
      })),
    )
      .then((all) =>
        dedupeBy((all as KulinerItem[]).map(kulinerToCulinary), (c) => c.id),
      )
      .catch((err) => {
        culinaryPromise = null;
        throw err;
      });
  }
  return culinaryPromise;
}

const featuredCulinaryPromises: Record<number, Promise<Culinary[]>> = {};
export function getFeaturedCulinary(limit: number = 4): Promise<Culinary[]> {
  if (!featuredCulinaryPromises[limit]) {
    featuredCulinaryPromises[limit] = withBrowserCache(
      makeBrowserCacheKey("homepage:featured-culinary", { limit }),
      HOMEPAGE_TTL,
      async () => {
        const result = await kulinerApi.list({
          per_page: limit,
          sort: "rating",
        });
        const mapped = (result.items as KulinerItem[]).map(kulinerToCulinary);
        const featured = mapped.filter((item) => item.featured);
        return (featured.length ? featured : mapped).slice(0, limit);
      },
    ).catch((err) => {
      delete featuredCulinaryPromises[limit];
      throw err;
    });
  }
  return featuredCulinaryPromises[limit];
}

let hangoutPromise: Promise<Hangout[]> | null = null;
export function getHangouts(): Promise<Hangout[]> {
  if (!hangoutPromise) {
    hangoutPromise = fetchAllPages((page) =>
      nongkrongApi.list({ page, per_page: 500 }).then((r) => ({
        items: r.items,
        total: r.total,
        total_pages: r.total_pages,
      })),
    )
      .then((all) =>
        dedupeBy((all as NongkrongItem[]).map(nongkrongToHangout), (h) => h.id),
      )
      .catch((err) => {
        hangoutPromise = null;
        throw err;
      });
  }
  return hangoutPromise;
}

let homepagePromise: Promise<HomepageData> | null = null;
export function getHomepage(): Promise<HomepageData> {
  if (!homepagePromise) {
    homepagePromise = withBrowserCache(
      makeBrowserCacheKey("homepage:data:v2"),
      HOMEPAGE_TTL,
      async () => {
        const [wisataRes, kulinerRes, nongkrongRes] = await Promise.all([
          wisataApi.list({ per_page: 12, sort: "rating" }),
          kulinerApi.list({ per_page: 8, sort: "rating" }),
          nongkrongApi.list({ per_page: 8, sort: "rating" }),
        ]);

        const destinations = (wisataRes.items as WisataItem[]).map(
          wisataToDestination,
        );
        const culinary = (kulinerRes.items as KulinerItem[]).map(
          kulinerToCulinary,
        );
        const hangouts = (nongkrongRes.items as NongkrongItem[]).map(
          nongkrongToHangout,
        );

        const heroSlides = HOME_HERO_SLIDES;

        const stats: Stat[] = [
          {
            label: "Tempat wisata terdaftar",
            value: `${(wisataRes.total || destinations.length).toLocaleString("id-ID")}`,
            isPrototype: false,
          },
          {
            label: "Restoran & tempat makan",
            value: `${(kulinerRes.total || culinary.length).toLocaleString("id-ID")}`,
            isPrototype: false,
          },
          {
            label: "Cafe & tempat hangout",
            value: `${(nongkrongRes.total || hangouts.length).toLocaleString("id-ID")}`,
            isPrototype: false,
          },
        ];

        const topDest = (
          destinations.filter((d) => d.featured).length
            ? destinations.filter((d) => d.featured)
            : destinations
        ).slice(1, 4);
        const topCul = (
          culinary.filter((c) => c.featured).length
            ? culinary.filter((c) => c.featured)
            : culinary
        ).slice(0, 2);
        const topHang = (
          hangouts.filter((h) => h.featured).length
            ? hangouts.filter((h) => h.featured)
            : hangouts
        ).slice(0, 2);
        const hiddenGems: HiddenGem[] = [...topDest, ...topCul, ...topHang]
          .slice(0, 6)
          .map((item) => ({
            id: `gem-${item.id}`,
            label: item.name,
            region: item.region,
            src: item.images[0]?.src || "/images/fallback/fallback-1.jpg",
            alt: item.name,
          }));

        return { heroSlides, stats, hiddenGems };
      },
    ).catch((err) => {
      homepagePromise = null;
      throw err;
    });
  }
  return homepagePromise;
}

export async function getRegionBySlug(
  slug: string,
): Promise<Region | undefined> {
  const regions = await getRegions();
  return regions.find((r) => r.slug === slug);
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | undefined> {
  const list = await getDestinations();
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  return list.find(
    (d) => d.slug === decodedSlug || d.id.toLowerCase() === decodedSlug,
  );
}

export async function getCulinaryBySlug(
  slug: string,
): Promise<Culinary | undefined> {
  const list = await getCulinary();
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  return list.find(
    (c) => c.slug === decodedSlug || c.id.toLowerCase() === decodedSlug,
  );
}

export async function getHangoutBySlug(
  slug: string,
): Promise<Hangout | undefined> {
  const list = await getHangouts();
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  return list.find(
    (h) => h.slug === decodedSlug || h.id.toLowerCase() === decodedSlug,
  );
}

export async function searchAll(query: string): Promise<{
  destinations: Destination[];
  culinary: Culinary[];
  hangouts: Hangout[];
}> {
  const q = query.toLowerCase();
  const [allDests, allCulinary, allHangouts] = await Promise.all([
    getDestinations(),
    getCulinary(),
    getHangouts(),
  ]);

  return {
    destinations: allDests.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q),
    ),
    culinary: allCulinary.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q),
    ),
    hangouts: allHangouts.filter(
      (h) =>
        h.name.toLowerCase().includes(q) || h.region.toLowerCase().includes(q),
    ),
  };
}
