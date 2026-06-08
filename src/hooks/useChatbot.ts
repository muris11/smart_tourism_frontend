'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useChatbotStore } from '@/stores/chatbotStore'
import { chatbotApi } from '@/lib/api/chatbot'
import type { ChatRequest } from '@/types'

interface UseChatbotReturn {
  sendMessage: (message: string, location?: { lat?: number; lon?: number }) => Promise<void>
  isLoading: boolean
  isTypingEffect: boolean
  streamingContent: string
  error: string | null
  stopGenerating: () => void
}

/** Hook untuk mengelola chatbot (kirim pesan, loading, stop) */
export function useChatbot(): UseChatbotReturn {
  const { user } = useAuthStore()
  const { addMessage, setSession, setTyping, sessionToken } = useChatbotStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isTypingEffect, setIsTypingEffect] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const stopTypingEffect = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
    setIsTypingEffect(false)
    setStreamingContent('')
  }, [])

  const startTypingEffect = useCallback((fullText: string, onComplete: () => void) => {
    let currentIndex = 0
    setStreamingContent('')
    setIsTypingEffect(true)

    const typeNextChar = () => {
      if (currentIndex <= fullText.length) {
        setStreamingContent(fullText.slice(0, currentIndex))
        currentIndex++
        typingTimeoutRef.current = setTimeout(typeNextChar, 20)
      } else {
        setIsTypingEffect(false)
        setStreamingContent('')
        onComplete()
      }
    }

    typeNextChar()
  }, [])

  const sendMessage = useCallback(
    async (message: string, location?: { lat?: number; lon?: number }) => {
      if (!message.trim()) return

      stopTypingEffect()

      const userMessage = {
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)

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

        const fullAnswer = response.answer

        startTypingEffect(fullAnswer, () => {
          const assistantMessage = {
            role: 'assistant' as const,
            content: fullAnswer,
            timestamp: new Date().toISOString(),
            references: response.referensi,
            wilayah: response.wilayah_terdeteksi,
          }
          addMessage(assistantMessage)
        })

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
    [sessionToken, addMessage, setSession, setTyping, user, startTypingEffect, stopTypingEffect]
  )

  const stopGenerating = useCallback(() => {
    if (abortController) {
      abortController.abort()
    }
    stopTypingEffect()
    setIsLoading(false)
    setTyping(false)
  }, [abortController, stopTypingEffect, setTyping])

  return {
    sendMessage,
    isLoading,
    isTypingEffect,
    streamingContent,
    error,
    stopGenerating,
  }
}