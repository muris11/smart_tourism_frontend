'use client'

import { useState } from 'react'

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
      >
        <span className="text-xl text-brand-navy transition-colors group-hover:text-brand-green">{question}</span>
        <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pr-12 leading-relaxed font-light text-slate-600">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'Penggunaan Platform',
      items: [
        {
          q: 'Apakah platform ini sepenuhnya gratis digunakan?',
          a: 'Ya, akses ke artikel kurasi, panduan destinasi, dan alat pembuat itinerary dasar tersedia gratis untuk pengguna terdaftar.',
        },
        {
          q: 'Bagaimana cara kerja fitur Perencana (Itinerary Builder)?',
          a: 'Setelah membuat akun, Anda dapat masuk ke menu Rencana lalu menambahkan preferensi atau destinasi yang ingin disusun menjadi alur perjalanan.',
        },
        {
          q: 'Apakah saya bisa menggunakan platform ini secara offline?',
          a: 'Saat ini aplikasi berbasis web masih membutuhkan koneksi internet. Fitur unduh itinerary bisa ditambahkan pada iterasi berikutnya.',
        },
      ],
    },
    {
      category: 'Kurasi & Rekomendasi',
      items: [
        {
          q: 'Bagaimana tim editor memilih destinasi yang masuk ke platform?',
          a: 'Tim menilai konteks lokal, otentisitas, kenyamanan eksplorasi, dan kekuatan cerita tempat sebelum direkomendasikan.',
        },
        {
          q: 'Apakah saya bisa mengusulkan tempat makan atau wisata lokal?',
          a: 'Tentu. Rekomendasi komunitas bisa dikirim melalui halaman Kontak untuk ditinjau lebih lanjut.',
        },
      ],
    },
    {
      category: 'Akun & Keamanan',
      items: [
        {
          q: 'Bagaimana cara menghapus akun saya?',
          a: 'Pada iterasi penuh, opsi penghapusan akun dapat ditaruh di area Profil atau Pengaturan Keamanan.',
        },
        {
          q: 'Apakah data perjalanan saya dibagikan ke pihak ketiga?',
          a: 'Tidak. Data preferensi dipakai hanya untuk pengalaman produk dan tidak ditujukan untuk penjualan ke pihak eksternal.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#FCFCFB] pt-32 pb-24 animate-fade-in">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Pusat Bantuan</span>
          <h1 className="mb-6 text-5xl text-brand-navy">Ada yang bisa kami bantu?</h1>
          <p className="text-lg font-light text-slate-500">Temukan jawaban atas pertanyaan umum terkait penggunaan fitur dan layanan kami.</p>
        </div>

        <div className="relative mb-16">
          <span className="absolute top-1/2 left-6 -translate-y-1/2 text-xl text-slate-400">⌕</span>
          <input
            type="text"
            placeholder="Cari topik bantuan (misal: 'itinerary', 'akun')..."
            className="w-full rounded-full border border-slate-200 bg-white py-5 pl-14 pr-8 text-base text-slate-800 shadow-sm outline-none transition-all focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>

        <div className="space-y-16">
          {faqs.map((group) => (
            <div key={group.category}>
              <h3 className="mb-6 inline-block border-b-2 border-brand-navy pb-2 text-2xl text-brand-navy">{group.category}</h3>
              <div className="rounded-3xl border border-slate-100 bg-white px-8 py-2 shadow-sm">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-slate-200 bg-brand-pale p-10 text-center">
          <h4 className="mb-3 text-2xl text-brand-navy">Belum menemukan jawaban?</h4>
          <p className="mb-8 font-light text-slate-500">Tim dukungan kami siap membantu merespons pertanyaan khusus Anda.</p>
          <a href="/kontak" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800">
            Hubungi Customer Support
          </a>
        </div>
      </div>
    </div>
  )
}
