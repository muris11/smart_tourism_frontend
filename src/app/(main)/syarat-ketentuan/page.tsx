import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, CheckCircle, AlertTriangle, Scale, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan Penggunaan | CITRA',
  description: 'Syarat dan Ketentuan Penggunaan platform CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant).',
}

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-citra-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-citra-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-page max-w-4xl relative z-10">
        {/* Header */}
        <div className="border-b border-citra-border/60 pb-8 mb-10">
          <div className="flex items-center gap-3 text-citra-primary mb-3">
            <Scale className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-wider">Persyaratan Hukum</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-citra-ink md:text-5xl">
            Syarat & <span className="text-transparent bg-clip-text bg-gradient-to-r from-citra-primary to-citra-accent">Ketentuan</span>
          </h1>
          <p className="mt-3 text-sm text-citra-muted flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Terakhir diperbarui: 7 Juni 2026
          </p>
        </div>

        {/* Intro */}
        <div className="prose max-w-none text-citra-body space-y-6">
          <p className="text-lg leading-relaxed text-citra-ink/80 font-medium">
            Selamat datang di CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant). 
          </p>
          <p className="leading-relaxed">
            Sebelum menggunakan layanan kami, harap membaca Syarat & Ketentuan Penggunaan ini dengan seksama. Dengan mengakses, mendaftar, atau menggunakan situs web kami di <Link href="/" className="text-citra-primary hover:underline font-semibold">smart-tourism-citra.web.id</Link> dan layanan asisten cerdas pariwisata yang menyertainya, Anda menyatakan bahwa Anda setuju untuk mematuhi dan terikat oleh seluruh poin Syarat & Ketentuan berikut. Jika Anda tidak menyetujui bagian mana pun dari persyaratan ini, Anda disarankan untuk tidak menggunakan layanan kami.
          </p>

          <hr className="my-8 border-citra-border/60" />

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Sidebar Sticky Navigation / Summary */}
            <div className="md:col-span-1 space-y-4">
              <div className="sticky top-32 bg-citra-surface border border-citra-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-citra-ink mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-citra-primary" />
                  Persyaratan
                </h3>
                <nav className="flex flex-col gap-2.5 text-sm font-medium">
                  <a href="#penggunaan-layanan" className="text-citra-muted hover:text-citra-primary transition-colors">1. Penggunaan Layanan</a>
                  <a href="#akun-keamanan" className="text-citra-muted hover:text-citra-primary transition-colors">2. Akun & Keamanan</a>
                  <a href="#kekayaan-intelektual" className="text-citra-muted hover:text-citra-primary transition-colors">3. Kekayaan Intelektual</a>
                  <a href="#batasan-tanggung-jawab" className="text-citra-muted hover:text-citra-primary transition-colors">4. Batasan Tanggung Jawab</a>
                  <a href="#konten-pengguna" className="text-citra-muted hover:text-citra-primary transition-colors">5. Konten Pengguna</a>
                  <a href="#perubahan-syarat" className="text-citra-muted hover:text-citra-primary transition-colors">6. Perubahan Persyaratan</a>
                  <a href="#kontak" className="text-citra-muted hover:text-citra-primary transition-colors">7. Hubungi Kami</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-10 text-justify">
              {/* Section 1 */}
              <section id="penggunaan-layanan" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">1. Ketentuan Penggunaan Layanan</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Layanan CITRA disediakan untuk membantu pengguna mendapatkan informasi pariwisata, kuliner, dan tempat nongkrong di wilayah Ciayumajakuning serta menyusun rencana perjalanan liburan pribadi. 
                  </p>
                  <p>
                    Anda setuju untuk tidak:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-citra-body">
                    <li>Menggunakan platform untuk tujuan ilegal, melanggar hukum, atau dilarang oleh Syarat Penggunaan ini.</li>
                    <li>Melakukan tindakan yang dapat merusak, melumpuhkan, membebani secara berlebihan, atau mengganggu server atau infrastruktur jaringan platform kami.</li>
                    <li>Mengekstraksi data secara massal (scraping, crawling) dari basis data destinasi kami tanpa persetujuan tertulis terlebih dahulu dari pengelola CITRA.</li>
                    <li>Menggunakan identitas palsu atau berpura-pura menjadi orang lain ketika mendaftar akun atau memberikan ulasan.</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="akun-keamanan" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">2. Pembuatan Akun dan Keamanan Sandi</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Untuk mengakses beberapa fitur unggulan seperti Itinerary Planner dan ulasan tempat, Anda diwajibkan mendaftarkan akun. Anda berjanji untuk memberikan data pendaftaran yang akurat, lengkap, dan terbaru.
                  </p>
                  <p>
                    Keamanan akun Anda sepenuhnya merupakan tanggung jawab Anda pribadi. Anda wajib menjaga kerahasiaan kata sandi Anda dan membatasi akses perangkat Anda ke akun tersebut. CITRA tidak akan bertanggung jawab atas kerugian atau kerusakan yang timbul akibat kegagalan Anda untuk melindungi kerahasiaan sandi atau informasi akun Anda.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="kekayaan-intelektual" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">3. Hak Kekayaan Intelektual</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Seluruh materi yang terdapat di platform CITRA, termasuk tetapi tidak terbatas pada kode pemrograman, desain antarmuka, tata letak visual, teks deskripsi destinasi, database tempat, logo resmi, ikon, serta asisten AI, adalah hak kekayaan intelektual milik pengembang CITRA atau pemberi lisensinya dan dilindungi oleh Undang-Undang Republik Indonesia tentang Hak Cipta dan Kekayaan Intelektual.
                  </p>
                  <p>
                    Penggunaan kembali, reproduksi, penggandaan, modifikasi, penyebaran, atau publikasi ulang bagian mana pun dari konten platform ini untuk kepentingan komersial tanpa izin tertulis yang sah dari pihak kami adalah tindakan pelanggaran hukum.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="batasan-tanggung-jawab" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <AlertTriangle className="h-5 w-5 animate-pulse" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink text-citra-accent">4. Batasan Tanggung Jawab</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Platform CITRA menyediakan informasi pariwisata, kuliner, dan nongkrong yang dikurasi serta diproses menggunakan kecerdasan buatan (AI) untuk tujuan referensi dan bantuan perencanaan liburan semata. Kami senantiasa berupaya menyajikan data yang akurat, namun kami tidak dapat memberikan jaminan mutlak atau bertanggung jawab atas:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-citra-body">
                    <li>Keakuratan real-time mengenai jam operasional tempat, harga tiket masuk (HTM), menu, atau ketersediaan fasilitas penunjang di lokasi destinasi terkait.</li>
                    <li>Keadaan cuaca, kondisi rute jalan, keselamatan fisik, atau perubahan mendadak di lapangan saat Anda mengunjungi lokasi yang direkomendasikan.</li>
                    <li>Kerugian finansial, cidera fisik, kekecewaan emosional, atau kerusakan properti yang terjadi selama perjalanan Anda. Keputusan akhir untuk berkunjung sepenuhnya berada pada tanggung jawab dan resiko Anda sendiri.</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="konten-pengguna" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">5. Konten yang Diunggah Pengguna</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Saat Anda mengunggah ulasan, rating, atau gambar pada platform kami, Anda menjamin bahwa konten tersebut tidak melanggar hak cipta pihak ketiga, tidak mengandung unsur pornografi, fitnah, kebencian SARA, atau konten ilegal lainnya. 
                  </p>
                  <p>
                    Dengan mengunggah konten tersebut ke platform CITRA, Anda memberikan lisensi non-eksklusif, bebas royalti, berlaku secara global, dan terus-menerus kepada platform CITRA untuk menampilkan, mereproduksi, dan menyebarkan konten tersebut guna menunjang operasional dan promosi platform ini.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="perubahan-syarat" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">6. Perubahan Syarat & Ketentuan</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Kami berhak untuk mengubah, memodifikasi, menambah, atau menghapus bagian dari Syarat & Ketentuan Penggunaan ini kapan saja demi menyesuaikan dengan kebutuhan operasional platform atau regulasi hukum yang berlaku di Indonesia. 
                  </p>
                  <p>
                    Pemberitahuan perubahan akan kami publikasikan di halaman ini dengan memperbarui tanggal "Terakhir diperbarui" di bagian atas halaman. Dengan tetap menggunakan platform CITRA setelah adanya pembaruan, Anda dianggap menyetujui perubahan tersebut.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="kontak" className="scroll-mt-32">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-citra-primary/10 text-citra-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-citra-ink">7. Hubungi Kami</h2>
                </div>
                <div className="space-y-3 pl-1.5">
                  <p>
                    Apabila Anda memiliki pertanyaan, keberatan, atau ingin meminta penjelasan lebih lanjut mengenai Syarat & Ketentuan Penggunaan platform ini, silakan hubungi kami melalui menu <Link href="/kontak" className="text-citra-primary hover:underline font-semibold">Hubungi Kami</Link> atau melalui alamat surel resmi pengelola di <code className="bg-citra-surface-soft border border-citra-border px-1.5 py-0.5 rounded text-xs text-citra-accent">legal@smart-tourism-citra.web.id</code>.
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