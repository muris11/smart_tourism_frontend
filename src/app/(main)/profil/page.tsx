import Link from 'next/link'

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 animate-fade-in">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-center gap-8 rounded-[2.5rem] border border-slate-100 bg-white p-10 text-center shadow-sm md:flex-row md:text-left">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
            <div className="h-16 w-16 rounded-full border border-slate-300 bg-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl text-brand-navy">Guest Traveler</h1>
            <p className="mb-6 font-light text-slate-500">Silakan masuk untuk menyimpan wishlist dan plan perjalanan.</p>
            <div className="flex justify-center gap-4 md:justify-start">
              <Link href="/login" className="rounded-full bg-brand-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-900">
                Masuk
              </Link>
              <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
