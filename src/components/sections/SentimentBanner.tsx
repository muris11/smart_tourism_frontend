export default function SentimentBanner() {
  return (
    <section className="bg-brand-pale py-24">
      <div className="container px-6 md:px-12">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="section-title mb-6">Lebih dari sekadar direktori</h2>
          <p className="section-copy">Kami menyiapkan alat bantu cerdas untuk menyusun perjalanan yang lebih terstruktur, lebih personal, dan lebih menyenangkan untuk dipakai.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            ['Kurasi Personal', 'Simpan destinasi dan susun daftar pilihan berdasarkan kota, suasana, atau agenda perjalanan.'],
            ['Pembuat Itinerary', 'Bangun rencana harian yang realistis dengan alur perjalanan yang lebih tertata.'],
            ['Asisten Cerdas', 'Chatbot siap membantu memberi rekomendasi wisata, kuliner, dan tempat singgah.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[2rem] border border-slate-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-4 text-2xl text-brand-navy">{title}</h3>
              <p className="text-sm leading-7 font-light text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
