import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Eye, Lock, RefreshCw, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | CITRA',
  description: 'Kebijakan Privasi platform CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant) dalam mengelola dan melindungi data pribadi pengguna.',
}

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-citra-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-citra-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-page max-w-4xl relative z-10">
        {/* Header */}
        <div className="border-b border-citra-border/60 pb-8 mb-10">
          <div className="flex items-center gap-3 text-citra-primary mb-3">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-wider">Hukum & Privasi</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-citra-ink md:text-5xl">
            Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-r from-citra-primary to-citra-accent">Privasi</span>
          </h1>
          <p className="mt-3 text-sm text-citra-muted flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Terakhir diperbarui: 7 Juni 2026
          </p>
        </div>

        {/* Intro */}
        <div className="prose max-w-none text-citra-body space-y-6">
          <p className="text-lg leading-relaxed text-citra-ink/80 font-medium">
            Di CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant), kami sangat menghargai kepercayaan Anda dan berkomitmen penuh untuk melindungi privasi serta keamanan data pribadi Anda. 
          </p>
          <p className="leading-relaxed">
            Kebijakan Privasi ini dirancang untuk membantu Anda memahami bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi yang Anda berikan kepada kami ketika Anda mengakses situs web kami di <Link href="/" className="text-citra-primary hover:underline font-semibold">smart-tourism-citra.web.id</Link> dan seluruh layanan terkait yang kami tawarkan.
          </p>

          <hr className="my-8 border-citra-border/60" />

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Sidebar Sticky Navigation / Summary */}
            <div className="md:col-span-1 space-y-4">
              <div className="sticky top-32 bg-citra-surface border border-citra-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-citra-ink mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-citra-primary" />
                  Daftar Isi
                </h3>
                <nav className="flex flex-col gap-2.5 text-sm font-medium">
                  <a href="#koleksi-data" className="text-citra-muted hover:text-citra-primary transition-colors">1. Pengumpulan Data</a>
                  <a href="#penggunaan-data" className="text-citra-muted hover:text-citra-primary transition-colors">2. Penggunaan Informasi</a>
                  <a href="#keamanan-data" className="text-citra-muted hover:text-citra-primary transition-colors">3. Keamanan Informasi</a>
                  <a href="#berbagi-data" className="text-citra-muted hover:text-citra-primary transition-colors">4. Pengungkapan Pihak Ketiga</a>
                  <a href="#hak-pengguna" className="text-citra-muted hover:text-citra-primary transition-colors">5. Hak-Hak Anda</a>
                  <a href="#cookies" className="text-citra-muted hover:text-citra-primary transition-colors">6. Kebijakan Cookies</a>
                  <a href="#kontak-kami" className="text-citra-muted hover:text-citra-primary transition-colors">7. Hubungi Kami</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-10 text-justify">
              {/* Section 1 */}
              <section id="koleksi-data" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">1. Informasi yang Kami Kumpulkan</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Kami mengumpulkan beberapa jenis informasi dari dan tentang pengguna layanan kami, termasuk:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-citra-body">
                    <li>
                      <strong>Informasi Identitas Pribadi:</strong> Seperti nama lengkap, alamat email, foto profil, dan preferensi wisata yang Anda berikan secara sukarela saat mendaftarkan akun di platform kami.
                    </li>
                    <li>
                      <strong>Informasi Rencana Perjalanan:</strong> Detail mengenai destinasi wisata, kuliner, dan tempat nongkrong yang Anda pilih, jadwal hari perjalanan, serta catatan aktivitas yang Anda buat menggunakan fitur Itinerary Planner kami.
                    </li>
                    <li>
                      <strong>Data Penggunaan dan Teknis:</strong> Ketika Anda mengunjungi situs kami, sistem kami secara otomatis mencatat informasi perangkat dan koneksi Anda, termasuk alamat IP, jenis peramban (browser), sistem operasi, halaman rujukan/keluar, halaman yang Anda kunjungi, serta waktu dan tanggal akses Anda.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="penggunaan-data" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Kami menggunakan informasi yang kami kumpulkan untuk berbagai keperluan operasional dan pengembangan layanan, termasuk untuk:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-citra-body">
                    <li>Menyediakan, mengoperasikan, dan memelihara fitur platform CITRA agar berfungsi dengan baik untuk Anda.</li>
                    <li>Mempersonalisasi dan meningkatkan pengalaman pengguna Anda dengan memberikan rekomendasi destinasi pariwisata, kuliner, dan nongkrong yang relevan melalui asisten cerdas berbasis AI kami.</li>
                    <li>Memproses pembuatan, penyimpanan, dan penyusunan itinerary perjalanan otomatis yang Anda rancang.</li>
                    <li>Mengirimkan informasi administratif penting terkait perubahan syarat ketentuan, pembaruan keamanan, atau respon layanan pelanggan terhadap pertanyaan Anda.</li>
                    <li>Melakukan analisis statistik internal untuk memahami tren demografis dan pola perjalanan pengguna guna mengoptimalkan penyajian konten pariwisata wilayah Ciayumajakuning.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="keamanan-data" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">3. Perlindungan & Keamanan Informasi</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Keamanan data Anda adalah prioritas utama kami. Kami menerapkan langkah-langkah keamanan administratif, teknis, dan fisik yang ketat untuk melindungi data pribadi Anda dari akses tidak sah, kehilangan, pengungkapan, atau modifikasi ilegal. 
                  </p>
                  <p>
                    Kami menggunakan protokol enkripsi Secure Socket Layer (SSL/TLS) saat mentransmisikan data sensitif di internet, dan data sandi Anda disimpan menggunakan algoritma hashing satu arah yang sangat aman. Namun, harap dipahami bahwa tidak ada metode transmisi atau penyimpanan digital di internet yang benar-benar 100% aman, sehingga kami tidak dapat menjamin keamanan mutlak atas data Anda.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="berbagi-data" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">4. Pengungkapan Kepada Pihak Ketiga</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Kami <strong>tidak akan pernah menjual, menyewakan, memperdagangkan, atau menyebarluaskan</strong> informasi identitas pribadi Anda kepada pihak ketiga manapun untuk tujuan pemasaran mereka tanpa persetujuan tegas dari Anda.
                  </p>
                  <p>
                    Kami hanya membagikan informasi Anda dalam situasi terbatas berikut:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-citra-body">
                    <li>Kepada penyedia layanan pihak ketiga terpercaya yang kami gunakan untuk mendukung operasional platform kami (seperti hosting database, layanan email otomatis, dan analitik web), dengan ketentuan bahwa mereka setuju untuk menjaga kerahasiaan informasi tersebut.</li>
                    <li>Jika diwajibkan oleh hukum, pengadilan, atau otoritas pemerintah yang berwenang untuk mematuhi kewajiban hukum yang sah.</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="hak-pengguna" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">5. Hak-Hak Anda sebagai Pengguna</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Anda memiliki kendali penuh atas informasi pribadi Anda di platform CITRA. Hak-hak tersebut meliputi:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-citra-body">
                    <li><strong>Akses & Perbaikan:</strong> Anda dapat melihat dan memperbarui detail profil Anda kapan saja secara langsung melalui menu pengaturan profil.</li>
                    <li><strong>Penghapusan Data:</strong> Anda memiliki hak untuk meminta kami menghapus seluruh informasi pribadi dan data rencana perjalanan Anda. Proses ini dapat dilakukan dengan menghapus akun Anda secara permanen di menu Pengaturan Akun, atau dengan menghubungi kami secara langsung.</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="cookies" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">6. Kebijakan Cookies</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Situs kami menggunakan "cookies" untuk meningkatkan kualitas pengalaman berselancar Anda. Cookies adalah file teks kecil yang disimpan pada peramban perangkat Anda. Kami menggunakan cookies untuk mengenali sesi masuk Anda (authentication session token), mengingat preferensi wilayah pencarian Anda, serta mengumpulkan data analitik agregat non-personal. Anda dapat menolak penggunaan cookies melalui pengaturan peramban Anda, namun harap dicatat bahwa beberapa fitur platform mungkin tidak dapat berfungsi dengan optimal.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="kontak-kami" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">7. Kontak dan Informasi Lebih Lanjut</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Apabila Anda memiliki pertanyaan, saran, atau kekhawatiran terkait Kebijakan Privasi ini atau penanganan privasi data Anda di platform kami, jangan ragu untuk menghubungi tim perlindungan data kami melalui halaman <Link href="/kontak" className="text-citra-primary hover:underline font-semibold">Hubungi Kami</Link> atau mengirimkan email resmi ke <code className="bg-citra-surface-soft border border-citra-border px-1.5 py-0.5 rounded text-xs text-citra-accent">privacy@smart-tourism-citra.web.id</code>.
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
