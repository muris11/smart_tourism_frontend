import type { Metadata } from 'next'
import Link from 'next/link'
import { Image, FileCode, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lisensi Aset | CITRA',
  description: 'Informasi lisensi dan atribusi atas aset visual, ikon, ilustrasi, dan media yang digunakan di platform CITRA.',
}

export default function LisensiAsetPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-citra-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-citra-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-page max-w-4xl relative z-10">
        {/* Header */}
        <div className="border-b border-citra-border/60 pb-8 mb-10">
          <div className="flex items-center gap-3 text-citra-primary mb-3">
            <Image className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-wider">Atribusi Aset</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-citra-ink md:text-5xl">
            Lisensi <span className="text-transparent bg-clip-text bg-gradient-to-r from-citra-primary to-citra-accent">Aset</span>
          </h1>
          <p className="mt-3 text-sm text-citra-muted flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Terakhir diperbarui: 7 Juni 2026
          </p>
        </div>

        {/* Intro */}
        <div className="prose max-w-none text-citra-body space-y-6">
          <p className="text-lg leading-relaxed text-citra-ink/80 font-medium">
            Komitmen kami terhadap transparansi hukum dan penghargaan atas karya kreator.
          </p>
          <p className="leading-relaxed">
            Halaman Lisensi Aset ini menjelaskan ketentuan hukum, hak cipta, dan kepemilikan atas media visual, ikonografis, ilustrasi grafis, pustaka kode, serta konten multimedia lainnya yang digunakan untuk mempercantik antarmuka dan memperkaya data pada situs web CITRA (<Link href="/" className="text-citra-primary hover:underline font-semibold">smart-tourism-citra.web.id</Link>).
          </p>

          <hr className="my-8 border-citra-border/60" />

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Sidebar Sticky Navigation / Summary */}
            <div className="md:col-span-1 space-y-4">
              <div className="sticky top-32 bg-citra-surface border border-citra-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-citra-ink mb-4 flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-citra-primary" />
                  Kategori Aset
                </h3>
                <nav className="flex flex-col gap-2.5 text-sm font-medium">
                  <a href="#gambar-foto" className="text-citra-muted hover:text-citra-primary transition-colors">1. Gambar & Fotografi</a>
                  <a href="#ikon-grafis" className="text-citra-muted hover:text-citra-primary transition-colors">2. Ikon & Antarmuka</a>
                  <a href="#font-tipografi" className="text-citra-muted hover:text-citra-primary transition-colors">3. Font & Tipografi</a>
                  <a href="#konten-pengguna" className="text-citra-muted hover:text-citra-primary transition-colors">4. Media Pengguna</a>
                  <a href="#penafian-cipta" className="text-citra-muted hover:text-citra-primary transition-colors">5. Penafian Hak Cipta</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-10 text-justify">
              {/* Section 1 */}
              <section id="gambar-foto" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <Image className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">1. Gambar dan Fotografi</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Aset gambar yang menampilkan keindahan alam, peninggalan sejarah, hidangan kuliner, dan tempat nongkrong di Ciayumajakuning bersumber dari beberapa saluran resmi dan bebas royalti dengan ketentuan lisensi sebagai berikut:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-citra-body">
                    <li>
                      <strong>Unsplash & Pexels:</strong> Digunakan di bawah lisensi Unsplash dan lisensi Pexels, yang mengizinkan pengunduhan, modifikasi, dan penggunaan foto secara gratis baik untuk kepentingan non-komersial maupun komersial tanpa kewajiban atribusi (meskipun kami sangat mengapresiasi para fotografer).
                    </li>
                    <li>
                      <strong>Kontributor Google Maps & Wikipedia Commons:</strong> Beberapa gambar destinasi lokal tertentu diperoleh dari unggahan publik kontributor lokal di Google Maps dan Wikimedia Commons di bawah lisensi Creative Commons (CC BY-SA / CC BY). Hak cipta foto sepenuhnya tetap dimiliki oleh masing-masing pemilik foto asli.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="ikon-grafis" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">2. Ikon dan Elemen Grafis</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Ikonografi interaktif dan elemen grafis dekoratif pada antarmuka sistem kami menggunakan pustaka open-source:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-citra-body">
                    <li>
                      <strong>Lucide React:</strong> Pustaka ikon berbasis SVG yang fleksibel dan bersih, digunakan di bawah <strong>Lisensi MIT</strong>. Lisensi ini mengizinkan penggunaan, penyalinan, modifikasi, dan penggabungan ikon dalam proyek komersial maupun non-komersial.
                    </li>
                    <li>
                      <strong>React Icons (FontAwesome):</strong> Ikon tertentu bersumber dari FontAwesome yang digunakan sesuai dengan lisensi Creative Commons Attribution 4.0 International untuk ikon dan lisensi SIL OFL 1.1 untuk font grafis.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="font-tipografi" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">3. Font dan Tipografi</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Keterbacaan teks dan keindahan visual tipografi pada platform CITRA didukung oleh font dari direktori Google Fonts:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-citra-body">
                    <li>
                      <strong>Plus Jakarta Sans:</strong> Digunakan sebagai font utama untuk teks body dan tombol, dilisensikan di bawah <strong>SIL Open Font License 1.1</strong>.
                    </li>
                    <li>
                      <strong>Clash Display (atau serupa):</strong> Digunakan untuk judul (headings) besar dan tulisan dekoratif untuk memberikan nuansa modern dan elegan, dilisensikan di bawah SIL Open Font License 1.1 atau lisensi personal/komersial gratis yang sesuai.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section id="konten-pengguna" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">4. Konten Buatan Pengguna (User Generated Content)</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Foto-foto, tulisan ulasan, ulasan kuliner, serta rencana perjalanan yang diunggah secara sukarela oleh pengguna terdaftar di platform CITRA sepenuhnya tetap menjadi milik hak cipta masing-masing pengguna tersebut. 
                  </p>
                  <p>
                    CITRA tidak mengklaim kepemilikan atas materi tersebut, namun kami memiliki lisensi non-eksklusif untuk menampilkan gambar dan ulasan tersebut secara publik pada halaman destinasi terkait di dalam situs CITRA demi memberikan informasi yang transparan kepada pengunjung lainnya.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="penafian-cipta" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-accent/10 text-citra-accent">
                    <AlertCircle className="h-5 w-5 animate-pulse" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">5. Penafian Hak Cipta dan Pelaporan Pelanggaran</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    CITRA sangat menghormati hak kekayaan intelektual orang lain. Kami berupaya semaksimal mungkin untuk mematuhi aturan penggunaan wajar (fair use) dan lisensi resmi dari setiap aset yang kami tampilkan.
                  </p>
                  <p>
                    Jika Anda adalah fotografer, desainer grafis, atau pemilik sah dari salah satu aset yang ditayangkan di platform kami dan menemukan bahwa aset tersebut digunakan tanpa izin, menyalahi ketentuan lisensi, atau tidak diberikan atribusi yang semestinya, silakan ajukan laporan klaim hak cipta Anda. Kami akan segera merespon dan menghapus atau memperbarui atribusi aset tersebut dalam waktu maksimal 2x24 jam kerja.
                  </p>
                  <p>
                    Laporan klaim dapat dikirimkan beserta bukti kepemilikan yang sah melalui formulir <Link href="/kontak" className="text-citra-primary hover:underline font-semibold">Hubungi Kami</Link> atau melalui surel resmi di <code className="bg-citra-surface-soft border border-citra-border px-1.5 py-0.5 rounded text-xs text-citra-accent">copyright@smart-tourism-citra.web.id</code>.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}