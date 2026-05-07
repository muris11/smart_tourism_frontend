'use client'

import { useCallback, useState } from 'react'

interface GeolocationState {
  lat: number | null
  lon: number | null
  error: string | null
  isLoading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lon: null,
    error: null,
    isLoading: false,
  })

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocation tidak didukung browser ini.' }))
      return
    }

    setState((s) => ({ ...s, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          error: null,
          isLoading: false,
        })
      },
      (err) => {
        setState({ lat: null, lon: null, error: err.message, isLoading: false })
      }
    )
  }, [])

  return { ...state, request }
}
