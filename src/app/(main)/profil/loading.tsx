export default function ProfilLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 animate-pulse rounded-full bg-slate-100" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-64 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
