export default function HomeTestimonials() {
  return (
    <section className="container px-6 py-24 md:px-12">
      <h2 className="mb-16 text-center text-4xl text-brand-navy">Cerita Pejalan Kaki</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {[
          [
            'Itinerary builder-nya sangat membantu! Saya bisa memetakan rute liburan 5 hari di Jogja tanpa pusing memikirkan jarak antar lokasi. Semuanya terstruktur rapi.',
            'Sarah Amanda',
            'Kreator Konten, Jakarta',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
          ],
          [
            'Rekomendasi kulinernya bukan tempat-tempat turis yang mahal, tapi warung-warung lokal otentik yang rasanya luar biasa. Benar-benar merawat cita rasa asli.',
            'Bima Prakoso',
            'Arsitek, Bandung',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
          ],
        ].map(([quote, name, role, image]) => (
          <div key={name} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-10 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6 flex gap-1 text-sm tracking-[0.14em] text-yellow-500">★★★★★</div>
            <p className="mb-8 text-lg leading-8 italic text-brand-navy">&quot;{quote}&quot;</p>
            <div className="flex items-center gap-4">
              <img src={image} className="h-12 w-12 rounded-full object-cover" alt={name} />
              <div>
                <h6 className="text-sm font-bold text-brand-navy">{name}</h6>
                <span className="text-xs text-slate-500">{role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
