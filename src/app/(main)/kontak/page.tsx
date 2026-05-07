export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFB] pt-32 pb-24 animate-fade-in">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Hubungi Kami</span>
          <h1 className="mb-6 text-5xl leading-tight text-brand-navy md:text-6xl">Mari bertukar pesan.</h1>
          <p className="text-lg font-light leading-relaxed text-slate-500">
            Punya rekomendasi tempat tersembunyi, kendala teknis, atau sekadar ingin menyapa? Kami selalu terbuka untuk mendengarkan.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10 lg:col-span-7">
            <h3 className="mb-8 text-3xl text-brand-navy">Kirim Pesan</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Nama Lengkap</label>
                  <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="Nama yang bisa kami panggil" required />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Alamat Email</label>
                  <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="nama@email.com" required />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Topik</label>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-600 outline-none transition-all focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy">
                  <option value="">Pilih Topik Pertanyaan...</option>
                  <option value="support">Dukungan Teknis (Akun / Itinerary)</option>
                  <option value="recommendation">Rekomendasi Tempat Baru</option>
                  <option value="partnership">Kemitraan & Liputan</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Pesan Anda</label>
                <textarea rows={6} className="w-full resize-none rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="Tuliskan konteks, kebutuhan, atau pertanyaanmu dengan singkat dan jelas." required />
              </div>

              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--color-brand)] hover:shadow-lg">
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="space-y-10 lg:col-span-5">
            <div>
              <h4 className="mb-6 text-2xl text-brand-navy">Informasi Kontak</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-pale text-sm font-semibold text-brand-green">A</div>
                  <div>
                    <h6 className="mb-1 text-sm font-bold text-brand-navy">Kantor Redaksi</h6>
                    <p className="text-sm leading-relaxed font-light text-slate-500">
                      Gedung Pesona, Lantai 4
                      <br />
                      Jl. Medan Merdeka Barat No.17
                      <br />
                      Jakarta Pusat, 10110
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-pale text-sm font-semibold text-brand-blue">E</div>
                  <div>
                    <h6 className="mb-1 text-sm font-bold text-brand-navy">Email Resmi</h6>
                    <p className="text-sm leading-relaxed font-light text-slate-500">
                      halo@wonderful.id
                      <br />
                      partnership@wonderful.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-pale text-sm font-semibold text-brand-navy">T</div>
                  <div>
                    <h6 className="mb-1 text-sm font-bold text-brand-navy">Telepon</h6>
                    <p className="text-sm leading-relaxed font-light text-slate-500">
                      +62 21 555 0192
                      <br />
                      Senin - Jumat, 09:00 - 17:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-brand-navy p-8 text-white shadow-sm">
              <h4 className="mb-3 text-xl">Butuh respon cepat?</h4>
              <p className="mb-6 text-sm font-light text-white/70">
                Gunakan asisten CITRA di pojok kanan bawah layar untuk pertanyaan umum seputar fitur aplikasi.
              </p>
              <button className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:bg-brand-pale">
                Buka Chat CITRA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
