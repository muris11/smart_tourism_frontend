"use client";

import { useEffect, useState } from "react";
import { sentimentApi } from "@/lib/api/sentiment";
import type { SentimentSummary } from "@/types";
import { regionsApi } from "@/lib/api/regions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LabelList } from "recharts";
import { MessageSquare, ThumbsUp, ThumbsDown, Award, TrendingUp, HelpCircle, Compass, Info, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";

interface SentimentChartProps {
  wilayah?: string;
}

const SENTIMENT_COLORS = {
  positif: "#10b981", // Emerald 500
  negatif: "#f43f5e", // Rose 500
  netral: "#94a3b8",  // Slate 400
};

// Mock data untuk Aspect-Based Sentiment populer di setiap wilayah
const ASPECT_KEYWORDS: Record<string, { positive: string[]; negative: string[] }> = {
  summary: {
    positive: ["Pemandangan Indah", "Suasana Sejuk", "Kuliner Lezat", "Keramahan Lokal"],
    negative: ["Fasilitas Kurang", "Akses Jalan Sempit", "Parkir Terbatas"],
  },
  cirebon: {
    positive: ["Sejarah Kental", "Kuliner Khas Juara", "Akses Transportasi Mudah"],
    negative: ["Cuaca Cukup Panas", "Kemacetan Kota", "Fasilitas Publik Minim"],
  },
  indramayu: {
    positive: ["Pantai Eksotis", "Olahan Seafood Segar", "Harga Tiket Murah"],
    negative: ["Kebersihan Pantai", "Fasilitas Pendukung", "Akses Transportasi"],
  },
  majalengka: {
    positive: ["Terasering Indah", "Banyak Curug Asri", "Udara Pegunungan Sejuk"],
    negative: ["Akses Jalan Ekstrim", "Penerangan Jalan Minim", "Sinyal Seluler Lemah"],
  },
  kuningan: {
    positive: ["Destinasi Air Jernih", "Udara Dingin Segar", "Pemandangan Gunung Ciremai"],
    negative: ["Antrean Ramai Weekend", "Tempat Sampah Minim", "Biaya Tambahan Spot Foto"],
  },
};

export default function SentimentChart({
  wilayah: selectedWilayah,
}: SentimentChartProps) {
  const [allData, setAllData] = useState<SentimentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wilayahColors, setWilayahColors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"cirebon" | "indramayu" | "majalengka" | "kuningan" | "summary" | null>("summary");

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
  const totalRawPositif = allData.reduce((sum, item) => sum + item.positif, 0);
  const totalRawNegatif = allData.reduce((sum, item) => sum + item.negatif, 0);
  const aggregatePositif = Number(((totalRawPositif / totalUlasan) * 100).toFixed(1));
  const aggregateNegatif = Number(((totalRawNegatif / totalUlasan) * 100).toFixed(1));

  // Determine active dataset
  const activeRegionData = activeTab === "summary"
    ? {
        wilayah: "Seluruh Wilayah",
        total_ulasan: totalUlasan,
        positif: aggregatePositif,
        negatif: aggregateNegatif,
        rawPositif: totalRawPositif,
        rawNegatif: totalRawNegatif,
      }
    : comparisonData.find((d) => d.wilayah.toLowerCase() === activeTab);

  // Cari daerah dengan tingkat kepuasan tertinggi
  const mostSatisfiedRegion = [...comparisonData].sort((a, b) => b.positif - a.positif)[0];

  // Data untuk mini Donut Chart di Bento Spotlight
  const pieData = activeRegionData
    ? [
        { name: "Positif", value: activeRegionData.positif, color: SENTIMENT_COLORS.positif },
        { name: "Negatif", value: activeRegionData.negatif, color: SENTIMENT_COLORS.negatif },
      ]
    : [];

  const handleChartClick = (state: any) => {
    if (state && state.activeLabel) {
      const regionName = state.activeLabel.toLowerCase();
      if (["cirebon", "indramayu", "majalengka", "kuningan"].includes(regionName)) {
        setActiveTab(regionName as any);
      }
    }
  };

  const currentKeywords = ASPECT_KEYWORDS[activeTab || "summary"];

  return (
    <div className="space-y-12">
      {/* 1. Header & Quick Analytics Dashboard */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Analisis Sentimen Publik</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Apa Kata Mereka?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Menyajikan analisis respon publik secara real-time berdasarkan akumulasi <span className="font-bold text-slate-900 underline decoration-primary-500 decoration-2">{totalUlasan.toLocaleString()} ulasan</span> Google Maps dari wisatawan di Ciayumajakuning.
          </p>
        </div>

        {/* Highlight Card */}
        {mostSatisfiedRegion && (
          <div className="w-full md:w-auto shrink-0 flex items-center gap-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 md:px-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-200">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Kepuasan Tertinggi</p>
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
          <div className="flex flex-col flex-1 min-h-0">
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
            <div className="flex-1 w-full mt-6 min-h-[288px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  barGap={4}
                  onClick={handleChartClick}
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
                  >
                    {comparisonData.map((entry, index) => {
                      const isSelected = entry.wilayah.toLowerCase() === activeTab;
                      return (
                        <Cell 
                          key={`cell-pos-${index}`} 
                          fill={SENTIMENT_COLORS.positif}
                          opacity={activeTab === "summary" || isSelected ? 1 : 0.45}
                          className="cursor-pointer transition-all duration-300"
                        />
                      );
                    })}
                  </Bar>
                  <Bar
                    dataKey="negatif"
                    name="Negatif"
                    fill={SENTIMENT_COLORS.negatif}
                    radius={[0, 99, 99, 0]}
                    barSize={14}
                  >
                    {comparisonData.map((entry, index) => {
                      const isSelected = entry.wilayah.toLowerCase() === activeTab;
                      return (
                        <Cell 
                          key={`cell-neg-${index}`} 
                          fill={SENTIMENT_COLORS.negatif}
                          opacity={activeTab === "summary" || isSelected ? 1 : 0.45}
                          className="cursor-pointer transition-all duration-300"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insight Box */}
          <div className="mt-6 mb-2">
            <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-4 flex gap-3 items-start">
              <div className="bg-primary-100 text-primary-600 p-2 rounded-lg shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Insight Sentimen</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <span className="font-semibold text-slate-800">{mostSatisfiedRegion?.wilayah}</span> mencatat tingkat sentimen positif tertinggi (<span className="font-semibold text-emerald-600">{mostSatisfiedRegion?.positif}%</span>), menandakan kepuasan pengunjung yang sangat baik terhadap pengalaman wisata di wilayah ini.
                </p>
              </div>
            </div>
          </div>

          {/* Quick interactive tip */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-primary-500" />
              <span>Pilih bar wilayah di chart atau tab untuk memfilter data</span>
            </span>
            <span className="font-semibold text-slate-500">Ciayumajakuning</span>
          </div>
        </div>

        {/* RIGHT CARD: Detail Bento Spotlight (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-900 text-white p-6 shadow-card overflow-hidden relative border border-slate-800 transition-all hover:border-slate-700/80">
          {/* Glowing background gradient mesh */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-600/20 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-primary-600/30" />
          
          <div>
            {/* Custom Tab Selector */}
            <div className="flex border-b border-slate-800 pb-3 mb-6 overflow-x-auto scrollbar-none gap-2">
              <button
                onClick={() => setActiveTab("summary")}
                className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === "summary"
                    ? "bg-primary-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Gabungan
              </button>
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
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-black font-display tracking-tight text-white">
                      {activeRegionData.wilayah}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                      <span>{activeRegionData.total_ulasan.toLocaleString()} Ulasan Teranalisis</span>
                    </p>
                  </div>
                  
                  {/* Miniature Donut Chart inside Bento block */}
                  <div className="h-14 w-14 shrink-0 -mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={16}
                          outerRadius={24}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-donut-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Progress bar split visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-400">Positif ({activeRegionData.positif}%)</span>
                    <span className="text-rose-400">Negatif ({activeRegionData.negatif}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-850 rounded-full overflow-hidden flex p-0.5">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-550"
                      style={{ width: `${activeRegionData.positif}%` }}
                    />
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-550 ml-0.5"
                      style={{ width: `${activeRegionData.negatif}%` }}
                    />
                  </div>
                </div>

                {/* Aspect-Based Keywords Section */}
                {currentKeywords && (
                  <div className="space-y-3 bg-slate-950/40 rounded-xl p-4 border border-slate-800/60">
                    <h5 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Fokus Kata Kunci Ulasan</h5>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        {currentKeywords.positive.map((keyword, idx) => (
                          <span key={idx} className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-900/40">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <AlertCircle className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" />
                        {currentKeywords.negative.map((keyword, idx) => (
                          <span key={idx} className="text-[11px] font-semibold text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-900/40">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Detail Metrics cards */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-800/80 hover:border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Positif</span>
                    </div>
                    <p className="text-2xl font-extrabold font-display tracking-tight text-white mt-1">
                      {activeRegionData.rawPositif?.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Ulasan Baik</p>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-800/80 hover:border-rose-500/30">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-1">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Negatif</span>
                    </div>
                    <p className="text-2xl font-extrabold font-display tracking-tight text-white mt-1">
                      {activeRegionData.rawNegatif?.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Ulasan Kritik</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 pt-4 mt-6 flex justify-between items-center text-xs text-slate-400">
            <span>Sumber: Google Maps Scraper</span>
            <span className="text-primary-450 font-bold">CITRA AI</span>
          </div>
        </div>
      </div>

      {/* 3. Footer Note & Disclaimer */}
      <div className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 rounded-2xl p-5 max-w-4xl mx-auto shadow-sm">
        <Info className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          Statistik ini disarikan secara dinamis menggunakan model analisis sentimen berbasis pemrosesan bahasa alami (NLP) terhadap kumpulan ulasan publik. Data ditujukan untuk memberikan perspektif objektif mengenai persepsi kenyamanan dan kepuasan pengunjung di destinasi terkait.
        </p>
      </div>
    </div>
  );
}
