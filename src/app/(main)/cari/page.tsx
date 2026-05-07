export default function CariPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-fade-in">
      <div className="mx-auto max-w-3xl px-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari destinasi, kuliner, atau artikel..."
            className="w-full rounded-full border-2 border-slate-100 bg-slate-50 py-5 px-8 text-lg font-medium text-slate-800 shadow-sm outline-none transition-all focus:border-brand-green focus:bg-white"
            autoFocus
          />
        </div>

        <div className="mt-12">
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">Pencarian Populer</h4>
          <div className="flex flex-wrap gap-3">
            {['Pantai Kuta', 'Nasi Goreng', 'Cafe Jakarta', 'Candi Borobudur', 'Trip Bali 3 Hari'].map((term) => (
              <button
                key={term}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-brand-green hover:text-brand-green"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
