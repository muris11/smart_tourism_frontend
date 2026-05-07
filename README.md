# Frontend_CITRA

Frontend Next.js untuk CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant).

Stack utama:
- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Zustand
- SWR
- Zod

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Struktur Router

Project ini pakai **App Router**. Semua route ada di `src/app`.

```text
src/app/
├─ layout.tsx
├─ (main)/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ wisata/
│  │  ├─ page.tsx
│  │  └─ [kode]/
│  │     └─ page.tsx
│  ├─ kuliner/
│  │  ├─ page.tsx
│  │  └─ [kode]/
│  │     └─ page.tsx
│  ├─ nongkrong/
│  │  ├─ page.tsx
│  │  └─ [kode]/
│  │     └─ page.tsx
│  ├─ rekomendasi/
│  │  └─ page.tsx
│  ├─ planning/
│  │  └─ page.tsx
│  ├─ cari/
│  │  └─ page.tsx
│  └─ profil/
│     └─ page.tsx
└─ (auth)/
   ├─ login/
   │  └─ page.tsx
   └─ register/
      └─ page.tsx
```

## Cara Baca Router Ini

Contoh paling penting dulu:

```text
src/app/(main)/wisata/[kode]/page.tsx -> /wisata/:kode
```

Artinya:
- `src/app` = root semua route
- `(main)` = **route group**, hanya untuk organisasi folder, tidak muncul di URL
- `wisata` = segment URL `/wisata`
- `[kode]` = dynamic segment
- `page.tsx` = file halaman yang dirender

Jadi folder ini:

```text
src/app/(main)/kuliner/[kode]/page.tsx
```

akan menghasilkan URL:

```text
/kuliner/:kode
```

## Layout Chain

Ada 2 layer layout utama.

### 1. Root Layout

File:

```text
src/app/layout.tsx
```

Dipakai oleh **semua halaman**.

Tanggung jawabnya:
- set `html lang="id"`
- inject font Geist
- load global CSS
- set metadata global

Semua route di bawah `src/app` otomatis mewarisi layout ini.

### 2. Main Layout

File:

```text
src/app/(main)/layout.tsx
```

Dipakai hanya oleh halaman di group `(main)`.

Tanggung jawabnya:
- render `Navbar`
- render `<main>`
- render `Footer`
- render `ChatbotButton`

Berarti route berikut pakai layout ini:
- `/`
- `/wisata`
- `/wisata/:kode`
- `/kuliner`
- `/kuliner/:kode`
- `/nongkrong`
- `/nongkrong/:kode`
- `/rekomendasi`
- `/planning`
- `/cari`
- `/profil`

Sedangkan route auth **tidak** pakai `Navbar/Footer/Chatbot`, karena berada di group berbeda.

## Route Group

### `(main)`

Dipakai untuk halaman publik utama aplikasi.

Contoh:

```text
src/app/(main)/page.tsx -> /
src/app/(main)/planning/page.tsx -> /planning
```

### `(auth)`

Dipakai untuk halaman autentikasi.

Contoh:

```text
src/app/(auth)/login/page.tsx -> /login
src/app/(auth)/register/page.tsx -> /register
```

Penting:

```text
(main) dan (auth) tidak muncul di URL
```

Mereka hanya memisahkan layout dan struktur kerja.

## Daftar URL Lengkap

### Public Main

```text
/                       -> landing page
/wisata                 -> list wisata
/wisata/:kode           -> detail wisata
/kuliner                -> list kuliner
/kuliner/:kode          -> detail kuliner
/nongkrong              -> list nongkrong
/nongkrong/:kode        -> detail nongkrong
/rekomendasi            -> halaman rekomendasi
/planning               -> halaman itinerary/planning
/cari                   -> halaman pencarian
/profil                 -> halaman profil
```

### Auth

```text
/login                  -> halaman login
/register               -> halaman register
```

## Dynamic Route

Ada 3 dynamic route utama:

```text
/wisata/:kode
/kuliner/:kode
/nongkrong/:kode
```

Implementasi file:

```text
src/app/(main)/wisata/[kode]/page.tsx
src/app/(main)/kuliner/[kode]/page.tsx
src/app/(main)/nongkrong/[kode]/page.tsx
```

Di App Router terbaru, `params` di halaman async ini dipakai dari segment `[kode]`.

Contoh konsep:

```tsx
interface Props {
  params: Promise<{ kode: string }>
}
```

Lalu `kode` dipakai untuk fetch detail item.

## Mapping Cepat Folder -> URL

```text
src/app/(main)/page.tsx                      -> /
src/app/(main)/wisata/page.tsx               -> /wisata
src/app/(main)/wisata/[kode]/page.tsx        -> /wisata/:kode
src/app/(main)/kuliner/page.tsx              -> /kuliner
src/app/(main)/kuliner/[kode]/page.tsx       -> /kuliner/:kode
src/app/(main)/nongkrong/page.tsx            -> /nongkrong
src/app/(main)/nongkrong/[kode]/page.tsx     -> /nongkrong/:kode
src/app/(main)/rekomendasi/page.tsx          -> /rekomendasi
src/app/(main)/planning/page.tsx             -> /planning
src/app/(main)/cari/page.tsx                 -> /cari
src/app/(main)/profil/page.tsx               -> /profil
src/app/(auth)/login/page.tsx                -> /login
src/app/(auth)/register/page.tsx             -> /register
```

## Router Constants

Supaya path tidak di-hardcode di banyak tempat, project ini juga punya constant route di:

```text
src/lib/constants/routes.ts
```

Contoh:

```ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  WISATA: '/wisata',
  WISATA_DETAIL: (kode: string) => `/wisata/${kode}`,
}
```

Ini dipakai di komponen seperti card, navbar, dan navigasi internal.

## Kapan Tambah File Router Baru

Kalau mau tambah halaman baru, pakai pola ini:

### Halaman biasa

```text
src/app/(main)/tentang/page.tsx -> /tentang
```

### Halaman detail dinamis

```text
src/app/(main)/event/[slug]/page.tsx -> /event/:slug
```

### Halaman auth

```text
src/app/(auth)/forgot-password/page.tsx -> /forgot-password
```

## Kondisi Saat Ini

Router saat ini sudah mencakup:
- landing page
- list/detail wisata
- list/detail kuliner
- list/detail nongkrong
- rekomendasi
- planning
- cari
- profil
- login/register

Belum ada file khusus untuk:
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- middleware proteksi auth
- route handler `src/app/api/*`

Kalau fitur-fitur itu ditambah nanti, struktur router bisa diperluas tanpa ubah pola utama.

## Ringkasnya

Kalau mau cepat paham, cukup ingat 4 aturan ini:

1. `page.tsx` = halaman
2. `layout.tsx` = pembungkus route di level folder itu
3. `(group)` = tidak masuk URL, hanya grouping
4. `[param]` = dynamic segment di URL

Contoh final paling sederhana:

```text
src/app/(main)/wisata/[kode]/page.tsx
-> /wisata/:kode
-> pakai root layout
-> pakai main layout
```
