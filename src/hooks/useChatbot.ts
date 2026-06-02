'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useChatbotStore } from '@/stores/chatbotStore'
import { chatbotApi } from '@/lib/api/chatbot'
import type { ChatRequest } from '@/types'

interface UseChatbotReturn {
  sendMessage: (message: string, location?: { lat?: number; lon?: number }) => Promise<void>
  isLoading: boolean
  error: string | null
  stopGenerating: () => void
}

/** Hook untuk mengelola chatbot (kirim pesan, loading, stop) */
export function useChatbot(): UseChatbotReturn {
  const router = useRouter()
  const { user } = useAuthStore()
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

      const userMessage = {
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)

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

        const response = await chatbotApi.ask(payload, {
          userId: user?.id,
        })

        const assistantMessage = {
          role: 'assistant' as const,
          content: response.answer,
          timestamp: new Date().toISOString(),
          references: response.referensi,
          wilayah: response.wilayah_terdeteksi,
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
    [sessionToken, addMessage, setSession, setTyping, router, user]
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