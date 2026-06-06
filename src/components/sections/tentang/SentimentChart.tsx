"use client";

import { useEffect, useState } from "react";
import { sentimentApi } from "@/lib/api/sentiment";
import type { SentimentSummary } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SentimentChartProps {
  wilayah?: string;
}

import { regionsApi } from "@/lib/api/regions";

const SENTIMENT_COLORS = {
  positif: "#10b981",
  negatif: "#ef4444",
  netral: "#94a3b8",
};

export default function SentimentChart({
  wilayah: selectedWilayah,
}: SentimentChartProps) {
  const [allData, setAllData] = useState<SentimentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wilayahColors, setWilayahColors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [allSummary, regionsData] = await Promise.all([
            sentimentApi.summaryAll(),
            regionsApi.list()
        ]);
        setAllData(allSummary);
        
        const colors: Record<string, string> = {};
        regionsData.forEach(r => {
            colors[r.name] = r.color_hex || '#94a3b8';
        });
        setWilayahColors(colors);
      } catch (err) {
        console.error("Failed to fetch sentiment data:", err);
        setError("Gagal memuat data sentimen");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedWilayah]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-citra-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (allData.length === 0) {
    return (
      <div className="rounded-lg bg-slate-50 p-6 text-center text-slate-500">
        <p>Belum ada data sentimen tersedia</p>
      </div>
    );
  }

  // Siapkan data untuk chart perbandingan antar wilayah
  const comparisonData = allData.map((item) => {
    const total = item.total_ulasan || 1;
    const persentasePositif =
      item.persentase_positif || (item.positif / total) * 100 || 0;
    const persentaseNegatif = (item.negatif / total) * 100 || 0;
    const persentaseNetral = (item.netral / total) * 100 || 0;
    return {
      wilayah: item.wilayah,
      positif: persentasePositif,
      negatif: persentaseNegatif,
      netral: persentaseNetral,
      total_ulasan: item.total_ulasan,
    };
  });

  const hasAnyNetral = comparisonData.some((d) => d.netral > 0);

  const totalUlasan = allData.reduce((sum, item) => sum + item.total_ulasan, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <p className="eyebrow">Sentimen Wisatawan</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-citra-ink md:text-4xl">
          Apa Kata Mereka?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-citra-body">
          Berdasarkan {totalUlasan.toLocaleString()} ulasan dari Google Maps,
          mayoritas wisatawan memberikan pengalaman positif terhadap destinasi
          di Ciayumajakuning.
        </p>
      </div>

      {/* Tab Content: Perbandingan Wilayah */}
      <div className="space-y-6">
        {/* Bar Chart */}
        <div className="rounded-xl bg-white p-6 shadow-card">
          <h3 className="mb-6 text-center font-display text-lg font-semibold text-citra-ink">
            Perbandingan Sentimen Antar Wilayah
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="wilayah"
                  tick={{ fontSize: 13, fontWeight: 500 }}
                />
                <Tooltip
                  formatter={(value) => `${Number(value).toFixed(1)}%`}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="positif"
                  name="Positif (%)"
                  fill={SENTIMENT_COLORS.positif}
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="negatif"
                  name="Negatif (%)"
                  fill={SENTIMENT_COLORS.negatif}
                  radius={[0, 4, 4, 0]}
                />
                {hasAnyNetral && (
                  <Bar
                    dataKey="netral"
                    name="Netral (%)"
                    fill={SENTIMENT_COLORS.netral}
                    radius={[0, 4, 4, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allData.map((item) => (
            <div
              key={item.wilayah}
              className="rounded-xl bg-white p-5 shadow-card transition-all hover:shadow-card-hover"
            >
              <div
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: wilayahColors[item.wilayah] || '#3498db' }}
              >
                {item.wilayah}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-citra-ink">
                  {(() => {
                    const total = item.total_ulasan || 1;
                    return (
                      item.persentase_positif ||
                      (item.positif / total) * 100 ||
                      0
                    ).toFixed(1);
                  })()}
                  %
                </span>
                <span className="text-sm text-green-600">positif</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-lg font-semibold text-red-500">
                  {(() => {
                    const total = item.total_ulasan || 1;
                    return ((item.negatif / total) * 100 || 0).toFixed(1);
                  })()}
                  %
                </span>
                <span className="text-sm text-red-500">negatif</span>
              </div>
              {(() => {
                const total = item.total_ulasan || 1;
                const netralPct = (item.netral / total) * 100 || 0;
                if (netralPct > 0) {
                  return (
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-slate-500">
                        {netralPct.toFixed(1)}%
                      </span>
                      <span className="text-sm text-slate-500">netral</span>
                    </div>
                  );
                }
                return null;
              })()}
              <p className="mt-2 text-xs text-slate-400">
                {item.total_ulasan.toLocaleString()} ulasan
              </p>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${(() => {
                      const total = item.total_ulasan || 1;
                      return (
                        item.persentase_positif ||
                        (item.positif / total) * 100 ||
                        0
                      );
                    })()}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-slate-400">
        <p>
          Data dihimpun dari ulasan Google Maps menggunakan model analisis
          sentimen berbasis AI
        </p>
      </div>
    </div>
  );
}
