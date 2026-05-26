'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/Badge'
import { getRegions, type Region } from '@/lib/api'

interface InteractiveMapProps {
  className?: string
}

const CITRA_COLORS = ['#17624A', '#C86A49', '#507664', '#DFC291']

export default function InteractiveMap({ className }: InteractiveMapProps) {
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<any>(null)

  useEffect(() => {
    getRegions()
      .then(setRegions)
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

      regions.forEach((region, i) => {
        if (!region.coordinates) return
        const color = CITRA_COLORS[i % CITRA_COLORS.length]

        const markerHtml = `
          <div style="
            display:flex;align-items:center;justify-content:center;
            width:36px;height:36px;border-radius:50%;
            background:${color};color:#fff;
            font-family:system-ui,sans-serif;font-weight:700;font-size:13px;
            box-shadow:0 2px 8px ${color}55;
            border:2px solid white;
            cursor:pointer;
          ">${region.name.charAt(0)}</div>
        `

        const icon = L.divIcon({ html: markerHtml, className: '', iconSize: [36, 36], iconAnchor: [18, 18] })

        const marker = L.marker([region.coordinates.lat, region.coordinates.lng], { icon }).addTo(map)

        marker.bindTooltip(`<b>${region.name}</b><br/>${region.destinationCount} destinasi`, {
          offset: [0, -20],
          direction: 'top',
        })

        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;min-width:180px">
            <b style="color:${color};font-size:16px">${region.name}</b>
            <p style="margin:4px 0 8px;font-size:13px;color:#555">${region.description}</p>
            <a href="/wisata?region=${region.slug}" style="
              display:inline-block;padding:6px 16px;
              background:${color};color:white;border-radius:20px;
              text-decoration:none;font-size:13px;font-weight:600;
            ">Lihat Destinasi →</a>
          </div>
        `)
      })

      instanceRef.current = map
    }

    initMap()

    return () => {
      destroyed = true
      if (map) {
        map.remove()
        instanceRef.current = null
      }
    }
  }, [regions])

  return (
    <section className={cn('section-spacing', className)}>
      <div className="container-page">
        <div className="mb-8 text-center">
          <p className="eyebrow">Peta Wilayah</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl mt-2">
            Jelajahi Peta Interaktif
          </h2>
          <p className="mt-2 text-citra-body">
            Klik marker untuk lihat informasi tiap wilayah
          </p>
        </div>

        <div className="relative">
          <div
            ref={mapRef}
            className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden shadow-card border border-citra-border"
          />

          <div className="absolute top-3 left-3 z-[1000]">
            <Badge variant="overlay">Peta Interaktif</Badge>
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
