// src/hooks/useGeolocation.ts

'use client'

import { useState, useCallback } from 'react'

/** State untuk geolokasi */
interface GeolocationState {
  lat: number | null
  lon: number | null
  namaKota: string | null
  error: string | null
  isLoading: boolean
}

/** Hook untuk mendapatkan lokasi pengguna (GPS) */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lon: null,
    namaKota: null,
    error: null,
    isLoading: false,
  })

  /**
   * Mendapatkan nama kota dari koordinat
   * @param lat - Latitude
   * @param lon - Longitude
   */
  const getLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      )
      const data = await response.json()

      const city = data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        'Lokasi Anda'

      return city
    } catch {
      return 'Lokasi Anda'
    }
  }

  /** Meminta izin dan mendapatkan lokasi pengguna */
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation tidak didukung oleh browser ini',
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const namaKota = await getLocationName(lat, lon)

        setState({
          lat,
          lon,
          namaKota,
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        let errorMessage = 'Gagal mendapatkan lokasi'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Izin lokasi ditolak'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Lokasi tidak tersedia'
            break
          case error.TIMEOUT:
            errorMessage = 'Timeout mendapatkan lokasi'
            break
        }
        setState({
          lat: null,
          lon: null,
          namaKota: null,
          error: errorMessage,
          isLoading: false,
        })
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }, [])

  return {
    getLocation,
    lat: state.lat,
    lon: state.lon,
    namaKota: state.namaKota,
    error: state.error,
    isLoading: state.isLoading,
  }
}