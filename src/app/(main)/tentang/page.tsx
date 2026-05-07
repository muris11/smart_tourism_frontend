import Link from 'next/link'

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-fade-in">
      <section className="container mb-24 px-6 md:px-12">
        <span className="mb-4 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-green md:text-left">Tentang Kami</span>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <h1 className="max-w-3xl text-center text-5xl leading-tight text-brand-navy md:text-left md:text-7xl">
            Menjaga keaslian, merayakan keragaman.
          </h1>
          <p className="max-w-md text-center text-lg font-light text-slate-500 md:pb-3 md:text-left">
            Sebuah inisiatif independen yang didedikasikan untuk merekam dan memandu perjalanan otentik di seluruh pelosok Indonesia.
          </p>
        </div>
      </section>

      <section className="mx-auto mb-24 max-w-[1400px] px-6 md:px-12">
        <div className="relative h-[50vh] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 md:h-[70vh]">
          <img
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2000"
            alt="Perjalanan Indonesia"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto mb-24 max-w-4xl px-6 md:px-12">
        <h2 className="mb-8 text-center text-4xl text-brand-navy">Cerita Kami</h2>
        <div className="mx-auto space-y-6 text-lg leading-relaxed font-light text-slate-600">
          <p>
            Semuanya bermula dari sebuah kesadaran sederhana: banyak cerita lokal, resep leluhur, dan sudut-sudut indah di Indonesia yang perlahan terlupakan karena tidak terdokumentasi dengan baik.
          </p>
          <p>
            CITRA membawa semangat itu ke konteks digital Ciayumajakuning: menghadirkan rasa editorial, konteks lokal, dan eksplorasi yang tidak terasa generik.
          </p>
          <p>
            Misi kami bukan sekadar menunjukkan tempat yang indah untuk dilihat, tetapi memberi konteks, alur, dan pengalaman yang terasa lebih bermakna.
          </p>
        </div>
      </section>

      <section className="bg-brand-pale py-24">
        <div className="container px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-4xl text-brand-navy">Nilai yang Kami Pegang</h2>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              ['Berkelanjutan', 'Kami merekomendasikan tempat-tempat yang bertanggung jawab secara ekologis dan memberdayakan ekonomi masyarakat lokal.'],
              ['Otentisitas', 'Tidak ada ulasan titipan. Semua diarahkan ke pengalaman yang lebih jujur dan lebih terasa lokal.'],
              ['Inklusif', 'Panduan untuk berbagai gaya perjalanan: santai, spontan, keluarga, maupun eksplorasi mandiri.'],
            ].map(([title, copy]) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">•</div>
                <h3 className="mb-4 text-2xl text-brand-navy">{title}</h3>
                <p className="leading-relaxed font-light text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <h2 className="mb-6 text-4xl text-brand-navy">Mari menjadi bagian dari cerita</h2>
        <p className="mx-auto mb-10 max-w-xl text-lg font-light text-slate-500">Kami mengundang Anda untuk turut merawat ingatan dan membagikan pengalaman perjalanan otentik Anda.</p>
        <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition-colors hover:bg-slate-800">
          Bergabung dengan Komunitas
        </Link>
      </section>
    </div>
  )
}
