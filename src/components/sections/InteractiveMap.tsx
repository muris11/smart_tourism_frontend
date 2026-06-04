'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/Badge'
import { getRegions, type Region } from '@/lib/api'
import { wisataApi } from '@/lib/api/wisata'
import { kulinerApi } from '@/lib/api/kuliner'
import { nongkrongApi } from '@/lib/api/nongkrong'
import type { WisataItem, KulinerItem, NongkrongItem } from '@/types'
import { getFirstImage } from '@/lib/utils/format'

interface InteractiveMapProps {
  className?: string
}

interface MapItem {
  kode: string
  nama: string
  wilayah: string
  category: string
  rating: number
  address: string
  image: string
  lat: number
  lng: number
  type: 'wisata' | 'kuliner' | 'nongkrong'
}

const CITRA_COLORS = ['#17624A', '#C86A49', '#507664', '#DFC291']
const TYPE_COLORS = {
  wisata: '#17624A',   // Green
  kuliner: '#C86A49',  // Orange/Rust
  nongkrong: '#507664' // Slate
}

export default function InteractiveMap({ className }: InteractiveMapProps) {
  const [regions, setRegions] = useState<Region[]>([])
  const [items, setItems] = useState<MapItem[]>([])
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<any>(null)
  const markersGroupRef = useRef<any>(null)

  useEffect(() => {
    // Fetch regions and all items with coordinate data
    Promise.all([
      getRegions(),
      wisataApi.list({ per_page: 100 }),
      kulinerApi.list({ per_page: 100 }),
      nongkrongApi.list({ per_page: 100 })
    ])
      .then(([regionsData, wisataRes, kulinerRes, nongkrongRes]) => {
        setRegions(regionsData)

        // Combine and map items that have coordinates
        const mappedWisata: MapItem[] = (wisataRes.items as WisataItem[])
          .filter(item => item.koordinat && item.koordinat.lat && item.koordinat.lng)
          .map(item => ({
            kode: item.kode,
            nama: item.nama,
            wilayah: item.wilayah,
            category: item.kategori_utama || item.jenis_tempat || 'Wisata',
            rating: item.rating_google ?? 0,
            address: item.alamat_lengkap || '',
            image: getFirstImage(item.gambar, '/images/fallback/fallback-1.jpg'),
            lat: item.koordinat!.lat,
            lng: item.koordinat!.lng,
            type: 'wisata'
          }))

        const mappedKuliner: MapItem[] = (kulinerRes.items as KulinerItem[])
          .filter(item => item.koordinat && item.koordinat.lat && item.koordinat.lng)
          .map(item => ({
            kode: item.kode,
            nama: item.nama,
            wilayah: item.wilayah,
            category: item.kategori_menu_utama || item.jenis_tempat || 'Kuliner',
            rating: item.rating_google ?? 0,
            address: item.alamat_lengkap || '',
            image: getFirstImage(item.gambar, '/images/fallback/fallback-2.webp'),
            lat: item.koordinat!.lat,
            lng: item.koordinat!.lng,
            type: 'kuliner'
          }))

        const mappedNongkrong: MapItem[] = (nongkrongRes.items as NongkrongItem[])
          .filter(item => item.koordinat && item.koordinat.lat && item.koordinat.lng)
          .map(item => ({
            kode: item.kode,
            nama: item.nama,
            wilayah: item.wilayah,
            category: item.konsep_suasana || item.cocok_untuk || 'Nongkrong',
            rating: item.rating_google ?? 0,
            address: item.alamat_lengkap || '',
            image: getFirstImage(item.gambar, '/images/fallback/fallback-3.jpg'),
            lat: item.koordinat!.lat,
            lng: item.koordinat!.lng,
            type: 'nongkrong'
          }))

        setItems([...mappedWisata, ...mappedKuliner, ...mappedNongkrong])
      })
      .catch(err => console.error('Failed to fetch map data:', err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const container = mapRef.current
    if (!container || regions.length === 0) return
    if ((container as any)._leaflet_id || instanceRef.current) return

    let destroyed = false
    let map: any

    const initMap = async () => {
      const L = await import('leaflet')
      await import('leaflet/dist/leaflet.css')

      if (destroyed || (container as any)._leaflet_id || instanceRef.current) return

      // Cirebon center default
      map = L.map(container, {
        center: [-6.73, 108.4],
        zoom: 9.5,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      markersGroupRef.current = L.featureGroup().addTo(map)
      instanceRef.current = map

      // Focus map to all markers once items are rendered
      renderMarkers(L)
    }

    initMap()

    return () => {
      destroyed = true
      if (map) {
        map.remove()
        instanceRef.current = null
        markersGroupRef.current = null
      }
    }
  }, [regions])

  // Update markers when items load
  useEffect(() => {
    if (!instanceRef.current || items.length === 0) return
    import('leaflet').then((L) => {
      renderMarkers(L)
    })
  }, [items])

  const renderMarkers = (L: any) => {
    const map = instanceRef.current
    const markersGroup = markersGroupRef.current
    if (!map || !markersGroup) return

    // Clear existing markers
    markersGroup.clearLayers()

    // Add region boundary/center markers
    regions.forEach((region, i) => {
      if (!region.coordinates) return
      const color = CITRA_COLORS[i % CITRA_COLORS.length]

      const markerHtml = `
        <div style="
          display:flex;align-items:center;justify-content:center;
          width:40px;height:40px;border-radius:50%;
          background:${color};color:#fff;
          font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:14px;
          box-shadow:0 4px 12px ${color}66;
          border:3px solid white;
          cursor:pointer;
          transition: transform 0.2s;
        " class="hover:scale-110">${region.name.slice(0, 3).toUpperCase()}</div>
      `

      const icon = L.divIcon({ html: markerHtml, className: '', iconSize: [40, 40], iconAnchor: [20, 20] })
      const marker = L.marker([region.coordinates.lat, region.coordinates.lng], { icon }).addTo(markersGroup)

      marker.bindTooltip(`<b>Wilayah: ${region.name}</b><br/>${region.description}`, {
        offset: [0, -22],
        direction: 'top',
      })

      marker.bindPopup(`
        <div style="font-family:var(--font-body),system-ui,sans-serif;min-width:200px;padding:4px">
          <b style="color:${color};font-size:16px;font-family:var(--font-display)">${region.name}</b>
          <p style="margin:6px 0 10px;font-size:13px;color:#555;line-height:1.4">${region.description}</p>
          <div style="display:flex;gap:8px">
            <a href="/wisata?region=${region.slug}" style="
              display:inline-block;padding:6px 12px;
              background:${color};color:white;border-radius:20px;
              text-decoration:none;font-size:12px;font-weight:600;
            ">Wisata</a>
            <a href="/kuliner?region=${region.slug}" style="
              display:inline-block;padding:6px 12px;
              background:#C86A49;color:white;border-radius:20px;
              text-decoration:none;font-size:12px;font-weight:600;
            ">Kuliner</a>
          </div>
        </div>
      `)
    })

    // Add individual destination markers
    items.forEach((item) => {
      const color = TYPE_COLORS[item.type]
      
      // Determine lucide-like icon representing the category or type
      let markerChar = '📍'
      if (item.type === 'kuliner') markerChar = '🍽️'
      if (item.type === 'nongkrong') markerChar = '☕'
      if (item.type === 'wisata') {
        if (item.category.includes('Alam')) markerChar = '🌲'
        else if (item.category.includes('Pantai')) markerChar = '🏖️'
        else if (item.category.includes('Religi')) markerChar = '🕌'
        else if (item.category.includes('Budaya')) markerChar = '🏛️'
        else markerChar = '🏞️'
      }

      const markerHtml = `
        <div style="
          display:flex;align-items:center;justify-content:center;
          width:30px;height:30px;border-radius:50%;
          background:${color};color:#fff;
          font-size:14px;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
          border:2px solid white;
          cursor:pointer;
        ">${markerChar}</div>
      `

      const icon = L.divIcon({ html: markerHtml, className: '', iconSize: [30, 30], iconAnchor: [15, 15] })
      const marker = L.marker([item.lat, item.lng], { icon }).addTo(markersGroup)

      marker.bindTooltip(`<b>${item.nama}</b><br/>${item.category} (${item.rating} ⭐)`, {
        offset: [0, -15],
        direction: 'top',
      })

      marker.bindPopup(`
        <div style="font-family:var(--font-body),system-ui,sans-serif;width:220px;padding:2px">
          <div style="position:relative;width:100%;height:100px;border-radius:6px;overflow:hidden;margin-bottom:8px">
            <img src="${item.image}" alt="${item.nama}" style="width:100%;height:100%;object-cover:cover;display:block" />
          </div>
          <b style="font-size:14px;color:#1e293b;display:block;margin-bottom:2px">${item.nama}</b>
          <span style="font-size:11px;color:${color};font-weight:600;text-transform:uppercase">${item.category}</span>
          <div style="display:flex;align-items:center;gap:4px;margin:4px 0 8px">
            <span style="color:#fbbf24">★</span>
            <span style="font-size:12px;font-weight:600">${item.rating}</span>
            <span style="color:#94a3b8;font-size:12px">•</span>
            <span style="color:#64748b;font-size:11px">${item.wilayah}</span>
          </div>
          <a href="/${item.type}/${item.kode.toLowerCase()}" style="
            display:block;padding:6px;text-align:center;
            background:${color};color:white;border-radius:6px;
            text-decoration:none;font-size:12px;font-weight:600;
          ">Lihat Detail</a>
        </div>
      `, {
        maxWidth: 260
      })
    })

    // Auto-fit bounds if we have markers
    if (items.length > 0) {
      try {
        map.fitBounds(markersGroup.getBounds().pad(0.05))
      } catch (e) {
        // Fallback
      }
    }
  }

  return (
    <section className={cn('section-spacing', className)}>
      <div className="container-page">
        <div className="mb-8 text-center">
          <p className="eyebrow">Peta Wilayah</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl mt-2">
            Jelajahi Peta Interaktif
          </h2>
          <p className="mt-2 text-citra-body">
            Klik marker untuk lihat informasi detail destinasi wisata, kuliner, dan tempat nongkrong real-time
          </p>
        </div>

        <div className="relative">
          <div
            ref={mapRef}
            className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden shadow-card border border-citra-border"
          />

          <div className="absolute top-3 left-3 z-[1000]">
            <Badge variant="overlay">Peta Interaktif Ciayumajakuning</Badge>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
          {regions.map((region, i) => (
            <a
              key={region.id}
              href={`/wisata?region=${region.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-citra-body hover:text-citra-ink transition-colors"
            >
              <span
                className="h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: CITRA_COLORS[i % CITRA_COLORS.length] }}
              />
              {region.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

