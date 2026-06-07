import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lisensi Aset',
}

export default function LisensiAsetPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
      <div className="container-page max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-citra-ink md:text-4xl">Lisensi Aset</h1>
        <p className="mt-2 text-sm text-citra-muted">Terakhir diperbarui: Juni 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-citra-body">
          <p>
            Halaman ini menjelaskan ketentuan lisensi atas aset visual, ikon, dan konten media lainnya yang digunakan di situs CITRA.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">1. Gambar dan Foto</h2>
          <p>
            Sebagian besar foto yang digunakan untuk melambangkan keindahan wilayah Ciayumajakuning didapatkan dari platform penyedia media bebas royalti seperti Unsplash, Pexels, dan Google Maps yang diunggah secara publik oleh kontributor lokal. Hak cipta dari masing-masing aset tetap berada di tangan fotografer asli.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">2. Ikon</h2>
          <p>
            Ikon grafis yang digunakan pada antarmuka platform ini bersumber dari perpustakaan ikon open-source populer, termasuk Lucide React dan React Icons (Fa6 / FontAwesome). Penggunaan ikon ini tunduk pada lisensi masing-masing (seperti lisensi MIT).
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">3. Konten Buatan Pengguna</h2>
          <p>
            Aset gambar atau ulasan yang diunggah oleh pengguna di platform ini tetap menjadi hak cipta milik pengguna. Namun, dengan mengunggahnya ke platform CITRA, Anda memberikan lisensi non-eksklusif kepada kami untuk menampilkan media tersebut di situs ini.
          </p>
        </div>
      </div>
    </div>
  )
}
