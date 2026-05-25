/** Route untuk halaman beranda */
export const ROUTES = {
  /** Halaman utama / Beranda */
  HOME: '/',
  /** Halaman login */
  LOGIN: '/login',
  /** Halaman registrasi */
  REGISTER: '/register',
  /** Halaman profil user */
  PROFIL: '/profil',
  /** Halaman list wisata */
  WISATA: '/wisata',
  /** Halaman detail wisata (dynamic berdasarkan kode) */
  WISATA_DETAIL: (kode: string) => `/wisata/${kode}`,
  /** Halaman list kuliner */
  KULINER: '/kuliner',
  /** Halaman detail kuliner (dynamic berdasarkan kode) */
  KULINER_DETAIL: (kode: string) => `/kuliner/${kode}`,
  /** Halaman list tempat nongkrong */
  NONGKRONG: '/nongkrong',
  /** Halaman detail tempat nongkrong (dynamic berdasarkan kode) */
  NONGKRONG_DETAIL: (kode: string) => `/nongkrong/${kode}`,
  /** Halaman rekomendasi wisata AI */
  REKOMENDASI: '/rekomendasi',
  /** Halaman planning itinerary / rencana perjalanan */
  PLANNING: '/planning',
  /** Halaman pencarian global */
  CARI: '/cari',
  /** Halaman tentang / about */
  TENTANG: '/tentang',
  /** Halaman frequently asked questions */
  FAQ: '/faq',
  /** Halaman kontak */
  KONTAK: '/kontak',
} as const

/** Tipe untuk route yang tersedia */
export type RouteKey = keyof typeof ROUTES

/** Tipe untuk nilai route (string) */
export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]