export default function CariLoading() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="h-14 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-5 flex gap-3">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-100" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  )
}
