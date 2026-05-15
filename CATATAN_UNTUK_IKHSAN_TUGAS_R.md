# Catatan untuk Ikhsan (Mengerjakan Tugas Rifqy — Task R1–R7)

> **Konteks:** Rifqy dan Ikhsan tukeran tugas.
> - Rifqy sudah selesai mengerjakan tugas Ikhsan (I1–I10) ✅
> - Ikhsan sekarang mengerjakan tugas Rifqy (R1–R7): UI atoms, cards, chatbot, filter, beranda, list, detail
>
> **Tanggal:** 15 Mei 2026

---

## STATUS SAAT INI

Semua file tugas R sudah di-reset jadi **placeholder minimal** (hanya return `<div>NamaKomponen</div>`).
Kamu tinggal isi dengan implementasi lengkap sesuai PRD.

---

## FOUNDATION YANG SUDAH TERSEDIA (dari tugas I — sudah selesai)

Kamu bisa langsung pakai semua ini tanpa perlu buat ulang:

| Layer | File | Fungsi |
|-------|------|--------|
| Types | `src/types/api.ts, auth.ts, wisata.ts, kuliner.ts, nongkrong.ts, chatbot.ts, recommendation.ts, sentiment.ts` | Semua type definition |
| API Client | `src/lib/api/client.ts` | Axios instance + token interceptor + 401 redirect |
| API Functions | `src/lib/api/auth.ts, wisata.ts, kuliner.ts, nongkrong.ts, chatbot.ts, recommendation.ts, sentiment.ts, search.ts` | Semua API calls |
| Stores | `src/stores/authStore.ts, chatbotStore.ts, filterStore.ts` | Zustand state management |
| Hooks | `src/hooks/useAuth.ts, useWisata.ts, useKuliner.ts, useNongkrong.ts, useChatbot.ts, useGeolocation.ts, useDebounce.ts` | SWR data fetching + utilities |
| Utils | `src/lib/utils/cn.ts, format.ts, haversine.ts` | Tailwind merge, format, jarak |
| Constants | `src/lib/constants/wilayah.ts, routes.ts` | 4 wilayah + semua route paths |
| Layout | `src/components/layout/Navbar.tsx, Footer.tsx` | Sudah responsif + auth state |
| Auth | `src/app/(auth)/login/page.tsx, register/page.tsx` | Zod + react-hook-form + useAuth |
| .env.local | `.env.local` | `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` |

---

## FILE YANG HARUS KAMU KERJAKAN (semuanya placeholder kosong)

### R1 — UI Atoms (`src/components/ui/`)
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `Skeleton.tsx` | Placeholder | Loading placeholder animasi (animate-pulse) |
| `Badge.tsx` | Placeholder | Label berwarna dengan variant |
| `EmptyState.tsx` | Placeholder | Tampilan data kosong (icon + teks + CTA) |
| `LoadingSpinner.tsx` | **BELUM ADA** | Spinner SVG, props: size, className |
| `RatingStars.tsx` | **BELUM ADA** | Bintang 1-5 (decimal), lucide-react Star |
| `Pagination.tsx` | **BELUM ADA** | Prev/next + angka halaman + ellipsis |
| `SentimentBadge.tsx` | **BELUM ADA** | Badge positif(hijau)/negatif(merah)/netral(abu) |

### R2 — Cards (`src/components/cards/`)
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `WisataCard.tsx` | Placeholder | Kartu wisata (next/image, link, rating, sentimen) |
| `KulinerCard.tsx` | Placeholder | Kartu kuliner |
| `NongkrongCard.tsx` | Placeholder | Kartu nongkrong |
| `RekoCard.tsx` | **BELUM ADA** | Kartu hasil rekomendasi AI |

### R3 — Filters (`src/components/filters/`)
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `FilterPanel.tsx` | Placeholder | Sidebar filter desktop, sinkron filterStore |
| `MobileFilterDrawer.tsx` | **BELUM ADA** | Drawer mobile (Radix Dialog) |

### R4 — Chatbot (`src/components/chatbot/`)
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `ChatbotButton.tsx` | Placeholder | FAB fixed bottom-right, animasi |
| `ChatbotDrawer.tsx` | Placeholder | Slide-in drawer, 380px desktop |
| `ChatMessage.tsx` | Placeholder | Bubble user vs assistant |
| `ChatInput.tsx` | Placeholder | Input + Enter kirim + Shift+Enter newline |

### R5 — Sections Beranda (`src/components/sections/`)
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `HeroSection.tsx` | Placeholder | Hero + search bar → redirect /cari?q=... |
| `WilayahSection.tsx` | Placeholder | 4 kartu kota → link /wisata?wilayah=X |
| `FeaturedWisata.tsx` | Placeholder | 6 wisata terbaik via useWisata (SWR) |
| `SentimentBanner.tsx` | Placeholder | Info fitur AI sentimen |
| `HomeTestimonials.tsx` | Placeholder | Testimoni |
| `HomeClosingCta.tsx` | Placeholder | CTA penutup |
| `HomeTrustStrip.tsx` | Placeholder | Trust strip |

### R5 — Halaman Beranda
| File | Status |
|------|--------|
| `src/app/(main)/page.tsx` | Placeholder (import sections) |

### R6 — Halaman List
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `src/app/(main)/wisata/page.tsx` | Placeholder | Grid + FilterPanel + Pagination + SWR |
| `src/app/(main)/kuliner/page.tsx` | Placeholder | Grid + FilterPanel + Pagination + SWR |
| `src/app/(main)/nongkrong/page.tsx` | Placeholder | Grid + FilterPanel + Pagination + SWR |
| `src/app/(main)/wisata/loading.tsx` | **BELUM ADA** | Skeleton grid |
| `src/app/(main)/kuliner/loading.tsx` | **BELUM ADA** | Skeleton grid |
| `src/app/(main)/nongkrong/loading.tsx` | **BELUM ADA** | Skeleton grid |

### R7 — Halaman Detail
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `src/app/(main)/wisata/[kode]/page.tsx` | Placeholder | SSR + generateMetadata + detail components |
| `src/app/(main)/kuliner/[kode]/page.tsx` | Placeholder | SSR + generateMetadata + detail components |
| `src/app/(main)/nongkrong/[kode]/page.tsx` | Placeholder | SSR + generateMetadata + detail components |
| `src/app/(main)/wisata/[kode]/loading.tsx` | **BELUM ADA** | Skeleton detail |
| `src/app/(main)/kuliner/[kode]/loading.tsx` | **BELUM ADA** | Skeleton detail |
| `src/app/(main)/nongkrong/[kode]/loading.tsx` | **BELUM ADA** | Skeleton detail |

### R7 — Detail Components (`src/components/detail/`)
| File | Status | Yang harus dibuat |
|------|--------|-------------------|
| `DetailHero.tsx` | Placeholder | Gallery/carousel gambar |
| `DetailInfo.tsx` | Placeholder | Info lengkap (alamat, jam, harga, fasilitas) |
| `DetailMap.tsx` | Placeholder | Embed peta (lat/lng) |
| `DetailSentiment.tsx` | Placeholder | Grafik sentimen (Recharts) |
| `DetailRecommendation.tsx` | Placeholder | 3-4 kartu terkait |

---

## PENTING: ATURAN YANG HARUS DIIKUTI

1. **Wajib pakai `next/image`** — bukan `<img>` tag
2. **Wajib pakai `cn()`** dari `@/lib/utils/cn` untuk merge class
3. **Semua komponen terima `className` prop**
4. **Tidak ada type `any`**
5. **Tidak ada `console.log()`**
6. **Semua API call via hooks** (`useWisata`, `useKuliner`, `useNongkrong`, `useChatbot`) — BUKAN langsung axios
7. **Filter sinkron dengan `filterStore`** (Zustand)
8. **Halaman detail: SSR + `generateMetadata()`** untuk SEO
9. **Setiap halaman punya loading state** (Skeleton) dan error state
10. **Halaman list: URL query params sinkron** (`/wisata?wilayah=Cirebon&page=2`)

---

## CARA PAKAI HOOKS YANG SUDAH ADA

```typescript
// Contoh halaman list wisata:
import { useWisata } from '@/hooks/useWisata'

const { data, isLoading, error, meta } = useWisata()
// data = WisataItem[]
// meta = { current_page, per_page, total, last_page }

// Contoh chatbot:
import { useChatbot } from '@/hooks/useChatbot'

const { messages, isLoading, sendMessage } = useChatbot()
await sendMessage({ message: 'Halo', session_token: '...' })

// Contoh filter:
import { useFilterStore } from '@/stores/filterStore'

const { filters, setFilter, resetFilters } = useFilterStore()
setFilter('wilayah', 'Cirebon')
```

---

## BACKEND API RESPONSE FORMAT

Semua endpoint Laravel mengembalikan:
```json
{
  "success": true,
  "message": "...",
  "data": [...],
  "meta": { "current_page": 1, "per_page": 10, "total": 50, "last_page": 5 }
}
```

Field penting di data:
- `wisata`: kode, nama, wilayah, kategori_utama, rating_google, sentimen, gambar (TEXT[]), fasilitas (TEXT[])
- `kuliner`: kode, nama, wilayah, jenis_tempat, rating_google, sentimen, gambar (TEXT[])
- `nongkrong`: kode, nama, wilayah, konsep_suasana, rating_google, sentimen, gambar (TEXT[])
- `search`: kode, nama, tipe (wisata/kuliner/nongkrong), wilayah, rating_google, sentimen

---

## URUTAN PENGERJAAN YANG DISARANKAN

```
1. R1: UI Atoms (LoadingSpinner, RatingStars, Pagination, SentimentBadge, perbaiki Skeleton/Badge/EmptyState)
2. R2: Cards (WisataCard, KulinerCard, NongkrongCard, RekoCard)
3. R3: FilterPanel + MobileFilterDrawer
4. R4: Chatbot (Button, Drawer, Message, Input)
5. R5: Beranda (HeroSection, WilayahSection, FeaturedWisata, SentimentBanner, dll)
6. R6: Halaman list (wisata, kuliner, nongkrong) + loading.tsx
7. R7: Halaman detail (wisata, kuliner, nongkrong) + loading.tsx + detail components
```

---

## VERIFIKASI SEBELUM PR

```bash
npx tsc --noEmit          # harus zero error
npm run dev               # harus jalan tanpa error
# Cek: tidak ada console.log, tidak ada type any
# Cek: semua halaman responsif (mobile, tablet, desktop)
# Cek: semua gambar pakai next/image
```
