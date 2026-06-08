"use client";

import { useEffect, useState } from "react";
import { sentimentApi } from "@/lib/api/sentiment";
import type { SentimentSummary } from "@/types";
import { regionsApi } from "@/lib/api/regions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MessageSquare, ThumbsUp, ThumbsDown, Award, TrendingUp, HelpCircle } from "lucide-react";

interface SentimentChartProps {
  wilayah?: string;
}

const SENTIMENT_COLORS = {
  positif: "#10b981", // Emerald 500
  negatif: "#f43f5e", // Rose 500
  netral: "#94a3b8",  // Slate 400
};

export default function SentimentChart({
  wilayah: selectedWilayah,
}: SentimentChartProps) {
  const [allData, setAllData] = useState<SentimentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wilayahColors, setWilayahColors] = useState<Record<string, string>>({});
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cirebon" | "indramayu" | "majalengka" | "kuningan" | null>("majalengka");

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
          colors[r.name] = r.color_hex || '#0d7a6a';
        });
        setWilayahColors(colors);

        // Cari wilayah dengan total ulasan atau persentase positif tertinggi sebagai default active tab
        if (allSummary.length > 0) {
          const sorted = [...allSummary].sort((a, b) => b.total_ulasan - a.total_ulasan);
          setActiveTab(sorted[0].wilayah.toLowerCase() as any);
        }
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
      <div className="flex h-96 flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">Menganalisis sentimen ulasan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-rose-50/50 border border-rose-100 p-8 text-center max-w-lg mx-auto">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
          <ThumbsDown className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Terjadi Gangguan</h3>
        <p className="text-sm text-slate-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 active:scale-95 shadow-sm"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (allData.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500 border border-dashed max-w-lg mx-auto">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <p className="text-sm font-medium">Belum ada data analisis sentimen yang tersedia</p>
      </div>
    );
  }

  // Pre-process chart data
  const comparisonData = allData.map((item) => {
    const total = item.total_ulasan || 1;
    const persentasePositif = item.persentase_positif || (item.positif / total) * 100 || 0;
    const persentaseNegatif = (item.negatif / total) * 100 || 0;
    const persentaseNetral = (item.netral / total) * 100 || 0;
    return {
      wilayah: item.wilayah,
      positif: Number(persentasePositif.toFixed(1)),
      negatif: Number(persentaseNegatif.toFixed(1)),
      netral: Number(persentaseNetral.toFixed(1)),
      total_ulasan: item.total_ulasan,
      rawPositif: item.positif,
      rawNegatif: item.negatif,
    };
  });

  const totalUlasan = allData.reduce((sum, item) => sum + item.total_ulasan, 0);
  const activeRegionData = comparisonData.find(
    (d) => d.wilayah.toLowerCase() === activeTab
  );

  // Cari daerah dengan tingkat kepuasan tertinggi
  const mostSatisfiedRegion = [...comparisonData].sort((a, b) => b.positif - a.positif)[0];

  return (
    <div className="space-y-12">
      {/* 1. Header & Quick Analytics Dashboard */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>AI Sentiment Analysis v1.2</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Apa Kata Mereka?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Menganalisis opini publik secara real-time. Berdasarkan <span className="font-bold text-slate-900 underline decoration-primary-500 decoration-2">{totalUlasan.toLocaleString()} ulasan</span> dari Google Maps di kawasan Ciayumajakuning.
          </p>
        </div>

        {/* Highlight Card */}
        {mostSatisfiedRegion && (
          <div className="w-full md:w-auto shrink-0 flex items-center gap-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 md:px-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-200">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Destinasi Terfavorit</p>
              <h4 className="text-base font-bold text-slate-900">{mostSatisfiedRegion.wilayah}</h4>
              <p className="text-xs font-semibold text-emerald-600">{mostSatisfiedRegion.positif}% Ulasan Positif</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Bento Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT CARD: Interactive Chart (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white border border-slate-100 p-6 shadow-card transition-all hover:shadow-card-hover">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Perbandingan Sentimen Antar Wilayah
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Persentase ulasan berdasarkan emosi kata kunci</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Positif
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Negatif
                </span>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-72 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  barGap={4}
                >
                  <XAxis type="number" domain={[0, 100]} unit="%" hide />
                  <YAxis
                    type="category"
                    dataKey="wilayah"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 13, fontWeight: 700, fill: "#1e293b" }}
                    width={90}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(241, 245, 249, 0.5)" }}
                    formatter={(value) => `${Number(value).toFixed(1)}%`}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      padding: "8px 12px"
                    }}
                  />
                  <Bar
                    dataKey="positif"
                    name="Positif"
                    fill={SENTIMENT_COLORS.positif}
                    radius={[0, 99, 99, 0]}
                    barSize={14}
                  />
                  <Bar
                    dataKey="negatif"
                    name="Negatif"
                    fill={SENTIMENT_COLORS.negatif}
                    radius={[0, 99, 99, 0]}
                    barSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick interactive tip */}
          <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-xs text-slate-400">
            <span>💡 Klik wilayah di samping untuk detail ulasan mendalam</span>
            <span className="font-semibold text-slate-500">Ciayumajakuning</span>
          </div>
        </div>

        {/* RIGHT CARD: Detail Bento Spotlight (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-900 text-white p-6 shadow-card overflow-hidden relative">
          {/* Subtle Decorative Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            {/* Custom Tab Selector */}
            <div className="flex border-b border-slate-800 pb-3 mb-6 overflow-x-auto scrollbar-none gap-2">
              {allData.map((item) => {
                const isSelected = item.wilayah.toLowerCase() === activeTab;
                return (
                  <button
                    key={item.wilayah}
                    onClick={() => setActiveTab(item.wilayah.toLowerCase() as any)}
                    className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      isSelected
                        ? "bg-primary-500 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {item.wilayah}
                  </button>
                );
              })}
            </div>

            {/* Active Region Insights */}
            {activeRegionData && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-black font-display tracking-tight text-white">
                    {activeRegionData.wilayah}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                    <span>Total {activeRegionData.total_ulasan.toLocaleString()} ulasan terverifikasi</span>
                  </p>
                </div>

                {/* Progress bar split visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-400">Positif ({activeRegionData.positif}%)</span>
                    <span className="text-rose-400">Negatif ({activeRegionData.negatif}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${activeRegionData.positif}%` }}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all duration-500"
                      style={{ width: `${activeRegionData.negatif}%` }}
                    />
                  </div>
                </div>

                {/* Detail Metrics cards */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-800/40 border border-slate-800/50 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>Positif</span>
                    </div>
                    <p className="text-lg font-black text-white">{activeRegionData.rawPositif.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Ulasan Baik</p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-800/50 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-1">
                      <ThumbsDown className="h-3.5 w-3.5" />
                      <span>Negatif</span>
                    </div>
                    <p className="text-lg font-black text-white">{activeRegionData.rawNegatif.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Ulasan Kritik</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 pt-4 mt-6 flex justify-between items-center text-xs text-slate-400">
            <span>Sumber: Google Maps Scraper</span>
            <span className="text-primary-400 font-bold">CITRA AI</span>
          </div>
        </div>
      </div>

      {/* 3. Footer Note & Disclaimer */}
      <div className="text-center bg-slate-50 border border-slate-200/60 rounded-xl p-4 max-w-3xl mx-auto">
        <p className="text-xs text-slate-500 leading-relaxed">
          *Analisis sentimen diproses secara otomatis oleh model Natural Language Processing (NLP) CITRA AI. Ulasan dikumpulkan secara agregat untuk memberikan gambaran umum tingkat kepuasan publik terhadap ekosistem pariwisata wilayah Ciayumajakuning.
        </p>
      </div>
    </div>
  );
}
