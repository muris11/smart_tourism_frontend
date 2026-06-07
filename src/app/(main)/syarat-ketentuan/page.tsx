import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
}

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
      <div className="container-page max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-citra-ink md:text-4xl">Syarat & Ketentuan</h1>
        <p className="mt-2 text-sm text-citra-muted">Terakhir diperbarui: Juni 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-citra-body">
          <p>
            Selamat datang di CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant). Dengan mengakses atau menggunakan situs kami, Anda setuju untuk mematuhi dan terikat oleh Syarat & Ketentuan berikut.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">1. Penggunaan Layanan</h2>
          <p>
            Layanan kami ditujukan untuk membantu Anda menemukan informasi pariwisata, kuliner, dan tempat nongkrong di wilayah Ciayumajakuning serta menyusun rencana perjalanan. Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan tidak melanggar hukum.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">2. Akun Pengguna</h2>
          <p>
            Saat membuat akun di CITRA, Anda wajib memberikan informasi yang akurat dan lengkap. Anda bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi akun Anda dan atas semua aktivitas yang terjadi di bawah akun Anda.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">3. Kekayaan Intelektual</h2>
          <p>
            Semua konten yang tersedia di CITRA, termasuk teks, grafis, logo, ikon, gambar, dan klip audio, adalah milik CITRA atau penyedia kontennya dan dilindungi oleh undang-undang hak cipta. Anda tidak diperkenankan untuk mereproduksi atau mendistribusikan konten ini tanpa izin tertulis dari kami.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">4. Batasan Tanggung Jawab</h2>
          <p>
            CITRA menyediakan rekomendasi berdasarkan data dan AI untuk tujuan informasi. Kami tidak menjamin keakuratan absolut dari informasi jam operasional, harga, atau ketersediaan tempat wisata, kuliner, atau tempat nongkrong. Kami tidak bertanggung jawab atas kerugian atau kekecewaan yang timbul dari kunjungan Anda ke destinasi yang direkomendasikan.
          </p>
        </div>
      </div>
    </div>
  )
}
