'use client'

import { useState } from 'react'
import { chatbotApi } from '@/lib/api/chatbot'
import { useChatbotStore } from '@/stores/chatbotStore'

export function useChatbot() {
  const store = useChatbotStore()
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (message: string) => {
    setError(null)
    store.addMessage({ role: 'user', content: message, timestamp: new Date().toISOString() })
    store.setTyping(true)

    try {
      const response = await chatbotApi.ask({
        message,
        session_token: store.sessionToken ?? undefined,
        wilayah: store.wilayah ?? undefined,
      })

      if (!store.sessionToken) {
        store.setSession(response.session_token)
      }
      if (response.wilayah) {
        store.setWilayah(response.wilayah)
      }

      store.addMessage({
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toISOString(),
      })
    } catch {
      setError('Gagal mengirim pesan. Silakan coba lagi.')
    } finally {
      store.setTyping(false)
    }
  }

  return { ...store, sendMessage, error }
}
