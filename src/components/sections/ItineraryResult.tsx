'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Save, CheckCircle, Loader2 } from 'lucide-react'
import { PlanningResult } from '@/types/recommendation'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api/client'

interface Props {
  result: PlanningResult
}

export default function ItineraryResult({ result }: Props) {
  const { isLoggedIn } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      await apiClient.post('/planning', {
        judul: `Perjalanan ${result.total_hari} Hari`,
        wilayah: result.itinerary.flatMap(d => d.tempat.map(t => t.wilayah)).filter((v, i, a) => a.indexOf(v) === i),
        jumlah_orang: 1,
        items: result.itinerary.flatMap(day =>
          day.tempat.map((t, idx) => ({
            hari: day.hari,
            urutan: idx + 1,
            tipe_tempat: t.tipe,
            tempat_kode: t.kode,
            nama: t.nama,
          }))
        ),
      })
      setSaved(true)
    } catch {
      setSaveError('Gagal menyimpan. Silakan coba lagi.')
    } finally {
      setIsSaving(false)
    }
  }

  function tipeBadgeColor(tipe: string) {
    switch (tipe) {
      case 'wisata': return 'bg-emerald-100 text-emerald-700'
      case 'kuliner': return 'bg-amber-100 text-amber-700'
      case 'nongkrong': return 'bg-violet-100 text-violet-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  function tipeLink(tipe: string, kode: string) {
    switch (tipe) {
      case 'wisata': return `/wisata/${kode}`
      case 'kuliner': return `/kuliner/${kode}`
      case 'nongkrong': return `/nongkrong/${kode}`
      default: return '#'
    }
  }

  if (result.itinerary.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">AI belum dapat menyusun itinerary. Coba ubah preferensi Anda.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Itinerary {result.total_hari} Hari</h2>
        {isLoggedIn ? (
          <button
            onClick={handleSave}
            disabled={isSaving || saved}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              saved
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Tersimpan
              </>
            ) : isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Simpan Rencana
              </>
            )}
          </button>
        ) : (
          <p className="text-xs text-slate-500">
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">Login</Link> untuk menyimpan rencana
          </p>
        )}
      </div>

      {saveError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">{saveError}</div>
      )}

      {result.itinerary.map((day) => (
        <div key={day.hari} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">Hari {day.hari}</h3>
          <div className="space-y-3">
            {day.tempat.map((tempat, idx) => (
              <Link
                key={`${day.hari}-${tempat.kode}-${idx}`}
                href={tipeLink(tempat.tipe, tempat.kode)}
                className="flex items-start gap-4 rounded-xl border border-slate-100 p-4 transition-all hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-800">{tempat.nama}</h4>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tipeBadgeColor(tempat.tipe)}`}>
                      {tempat.tipe}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    {tempat.wilayah && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {tempat.wilayah}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
