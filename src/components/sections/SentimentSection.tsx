'use client'

/* cspell:words wilayah tipe tempat Wisatawan Rekomendasi Kuliner Nongkrong Ciayumajakuning Cirebon Indramayu Majalengka Kuningan Sentimen */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sentimentApi } from '@/lib/api/sentiment'
import { Wilayah } from '@/lib/constants/wilayah'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface SentimentSectionProps {
    wilayah: Wilayah
    tipeTempat: 'wisata' | 'kuliner' | 'nongkrong'
}

interface SentimentData {
    wilayah: string
    tipe: string
    total_ulasan: number
    positif: number
    negatif: number
    netral: number
    persentase_positif: number
}

const SENTIMENT_COLORS = {
    positif: '#10b981',
    negatif: '#ef4444',
    netral: '#f59e0b',
}

const TIPE_LABEL: Record<string, string> = {
    wisata: 'Wisata',
    kuliner: 'Kuliner',
    nongkrong: 'Nongkrong',
}

export default function SentimentSection({ wilayah, tipeTempat }: SentimentSectionProps) {
    const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const wilayahData = await sentimentApi.summary(wilayah, tipeTempat)
                setSentimentData(wilayahData as SentimentData)
            } catch (err) {
                console.error('Failed to fetch sentiment data:', err)
                setError('Gagal memuat data sentimen')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [wilayah, tipeTempat])

    // Data untuk pie chart
    const pieData = sentimentData
        ? [
            { name: 'Positif', value: sentimentData.persentase_positif || ((sentimentData.positif / (sentimentData.total_ulasan || 1)) * 100) || 0, color: SENTIMENT_COLORS.positif },
            { name: 'Negatif', value: ((sentimentData.negatif / (sentimentData.total_ulasan || 1)) * 100) || 0, color: SENTIMENT_COLORS.negatif },
            { name: 'Netral', value: ((sentimentData.netral / (sentimentData.total_ulasan || 1)) * 100) || 0, color: SENTIMENT_COLORS.netral },
        ]
        : []

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <div className="h-6 w-6 animate-spin rounded-full border-3 border-citra-primary border-t-transparent" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-center text-xs text-red-600">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 rounded bg-red-600 px-2 py-1 text-[10px] text-white hover:bg-red-700"
                >
                    Coba Lagi
                </button>
            </div>
        )
    }

    if (!sentimentData || sentimentData.total_ulasan === 0) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
                <p>Belum ada data sentimen untuk {TIPE_LABEL[tipeTempat]} di {wilayah}</p>
            </div>
        )
    }

    const positifPersen = (sentimentData.positif / (sentimentData.total_ulasan || 1)) * 100
    const negatifPersen = (sentimentData.negatif / (sentimentData.total_ulasan || 1)) * 100

    return (
        <div className="rounded-lg border border-slate-200 bg-white shadow-card">
            {/* Header */}
            <div className="border-b border-slate-100 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-citra-ink"> Sentimen Wisatawan</h3>
                </div>
                <p className="text-[10px] text-slate-400">
                    {TIPE_LABEL[tipeTempat]} di {wilayah}
                </p>
            </div>

            <div className="p-4">
                {/* Pie Chart */}
                <div className="mb-4 flex justify-center">
                    <div className="h-32 w-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={35}
                                    outerRadius={55}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Legend */}
                <div className="mb-4 flex justify-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        <span className="text-xs text-slate-600">Positif</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        <span className="text-xs text-slate-600">Negatif</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS.netral }} />
                        <span className="text-xs text-slate-600">Netral</span>
                    </div>
                </div>

                {/* Ringkasan angka */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                        <p className="text-[10px] text-green-600">Positif</p>
                        <p className="text-lg font-bold text-green-600">
                            {positifPersen.toFixed(1)}%
                        </p>
                        <p className="text-[10px] text-green-500">
                            {sentimentData.positif.toLocaleString()} ulasan
                        </p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3 text-center">
                        <p className="text-[10px] text-red-500">Negatif</p>
                        <p className="text-lg font-bold text-red-500">
                            {negatifPersen.toFixed(1)}%
                        </p>
                        <p className="text-[10px] text-red-500">
                            {sentimentData.negatif.toLocaleString()} ulasan
                        </p>
                    </div>
                </div>

                {/* Progress bar kepuasan */}
                <div className="mb-3">
                    <div className="mb-1 flex justify-between text-[10px]">
                        <span className="text-green-600">Tingkat Kepuasan</span>
                        <span className="font-medium text-citra-ink">
                            {positifPersen.toFixed(1)}%
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-green-500 transition-all"
                            style={{ width: `${positifPersen}%` }}
                        />
                    </div>
                </div>

                {/* Total ulasan */}
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                    <p className="text-[10px] text-slate-400">Total Ulasan</p>
                    <p className="text-base font-bold text-citra-ink">
                        {sentimentData.total_ulasan.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Footer dengan link ke halaman Tentang */}
            <div className="border-t border-slate-100 px-4 py-2 text-center">
                <Link
                    href="/tentang#sentimen"
                    className="text-[9px] text-citra-primary hover:underline"
                >
                    Lihat perbandingan sentimen antar wilayah →
                </Link>
            </div>
        </div>
    )
}