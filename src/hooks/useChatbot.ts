'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useChatbotStore } from '@/stores/chatbotStore'
import { chatbotApi } from '@/lib/api/chatbot'
import type { ChatRequest } from '@/types'

interface UseChatbotReturn {
  sendMessage: (message: string, location?: { lat?: number; lon?: number }) => Promise<void>
  isLoading: boolean
  error: string | null
  stopGenerating: () => void
}

interface PlanningDetect {
  isPlanning: boolean
  wilayah: string | null
  hari: number
  budget: number | null
}

/**
 * Deteksi apakah pesan user merupakan request planning
 * @param message - Pesan dari user
 */
function detectPlanning(message: string): PlanningDetect {
  const lowerMsg = message.toLowerCase()

  const planningKeywords = /(plan|rencana|itinerary|rute|urutan|susun|jadwal|buatkan|buatin)/i
  if (!planningKeywords.test(lowerMsg)) {
    return { isPlanning: false, wilayah: null, hari: 2, budget: null }
  }

  const wilayahList = ['Cirebon', 'Indramayu', 'Majalengka', 'Kuningan', 'Ciayumajakuning']
  let detectedWilayah: string | null = null
  for (const w of wilayahList) {
    if (message.includes(w)) {
      detectedWilayah = w === 'Ciayumajakuning' ? 'Cirebon' : w
      break
    }
  }

  let hari = 2
  const hariMatch = message.match(/(\d+)\s*hari/i)
  if (hariMatch) {
    hari = parseInt(hariMatch[1])
  }

  let budget: number | null = null
  const budgetMatch = message.match(/budget\s*(\d+)/i)
  if (budgetMatch) {
    budget = parseInt(budgetMatch[1])
  }

  return { isPlanning: true, wilayah: detectedWilayah, hari, budget }
}

/** Hook untuk mengelola chatbot (kirim pesan, loading, stop, redirect planning) */
export function useChatbot(): UseChatbotReturn {
  const router = useRouter()
  const { addMessage, setSession, setTyping, sessionToken } = useChatbotStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  /**
   * Kirim pesan ke chatbot
   * @param message - Pesan dari user
   * @param location - Koordinat lokasi user (opsional)
   */
  const sendMessage = useCallback(
    async (message: string, location?: { lat?: number; lon?: number }) => {
      if (!message.trim()) return

      const planning = detectPlanning(message)

      const userMessage = {
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)

      // Redirect ke halaman planning jika terdeteksi
      if (planning.isPlanning) {
        let responseText = `Baik, saya akan bantu buatkan rencana perjalanan`
        if (planning.wilayah) responseText += ` di ${planning.wilayah}`
        responseText += ` selama ${planning.hari} hari`
        if (planning.budget) responseText += ` dengan budget Rp${planning.budget.toLocaleString()}`
        responseText += `. Silakan lengkapi detail di halaman berikut.`

        const assistantMessage = {
          role: 'assistant' as const,
          content: responseText,
          timestamp: new Date().toISOString(),
        }
        addMessage(assistantMessage)

        const params = new URLSearchParams()
        if (planning.wilayah) params.set('wilayah', planning.wilayah)
        if (planning.hari) params.set('hari', planning.hari.toString())
        if (planning.budget) params.set('budget', planning.budget.toString())

        setTimeout(() => {
          router.push(`/planning?${params.toString()}`)
        }, 1500)
        return
      }

      // Proses chat biasa
      setIsLoading(true)
      setError(null)
      setTyping(true)

      const controller = new AbortController()
      setAbortController(controller)

      try {
        const payload: ChatRequest = {
          message,
          session_token: sessionToken || undefined,
        }

        if (location?.lat && location?.lon) {
          payload.latitude = location.lat
          payload.longitude = location.lon
        }

        const response = await chatbotApi.ask(payload)

        const assistantMessage = {
          role: 'assistant' as const,
          content: response.answer,
          timestamp: new Date().toISOString(),
          references: response.referensi,
        }
        addMessage(assistantMessage)

        if (response.session_token) {
          setSession(response.session_token)
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setError('Terjadi kesalahan. Silakan coba lagi.')
        const errorMessage = {
          role: 'assistant' as const,
          content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
          timestamp: new Date().toISOString(),
        }
        addMessage(errorMessage)
      } finally {
        setIsLoading(false)
        setTyping(false)
        setAbortController(null)
      }
    },
    [sessionToken, addMessage, setSession, setTyping, router]
  )

  /** Stop generating response (membatalkan request) */
  const stopGenerating = useCallback(() => {
    if (abortController) {
      abortController.abort()
      setIsLoading(false)
      setTyping(false)
    }
  }, [abortController, setTyping])

  return {
    sendMessage,
    isLoading,
    error,
    stopGenerating,
  }
}