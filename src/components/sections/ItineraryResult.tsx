import { PlanningResult } from '@/types/recommendation'

interface Props {
  result: PlanningResult
}

export default function ItineraryResult({ result }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl text-brand-navy">Hasil Itinerary {result.total_hari} Hari</h2>
      {result.itinerary.length === 0 ? <div className="card p-6 text-sm text-slate-500">Belum ada itinerary dari backend.</div> : result.itinerary.map((day) => (
        <div key={day.hari} className="card p-6">
          <h3 className="text-2xl text-brand-navy">Hari {day.hari}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {day.tempat.map((tempat) => <li key={`${day.hari}-${tempat.kode}`}>{tempat.nama} · {tempat.tipe}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
