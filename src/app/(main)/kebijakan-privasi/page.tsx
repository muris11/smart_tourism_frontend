import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
}

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
      <div className="container-page max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-citra-ink md:text-4xl">Kebijakan Privasi</h1>
        <p className="mt-2 text-sm text-citra-muted">Terakhir diperbarui: Juni 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-citra-body">
          <p>
            Di CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant), kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan situs kami.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">1. Informasi yang Kami Kumpulkan</h2>
          <p>
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda membuat akun (nama, alamat email), mengisi rencana perjalanan, atau mengirimkan pesan kontak. Kami juga secara otomatis mengumpulkan informasi teknis tertentu saat Anda mengakses situs, seperti alamat IP dan jenis perangkat.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">2. Penggunaan Informasi</h2>
          <p>
            Kami menggunakan informasi yang dikumpulkan untuk menyediakan, memelihara, dan meningkatkan layanan kami, khususnya untuk mempersonalisasi rekomendasi pariwisata Anda, memproses rencana perjalanan Anda, dan berkomunikasi dengan Anda.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">3. Keamanan Data</h2>
          <p>
            Kami menggunakan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, perubahan, atau pengungkapan yang tidak sah. Namun, harap diingat bahwa tidak ada transmisi data di internet yang 100% aman.
          </p>

          <h2 className="font-display text-xl font-bold text-citra-ink mt-6">4. Perubahan Kebijakan Privasi</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan yang diperbarui.
          </p>
        </div>
      </div>
    </div>
  )
}
