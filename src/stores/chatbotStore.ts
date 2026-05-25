import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '@/types'

/** State untuk manajemen chatbot */
interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  sessionToken: string | null
  wilayah: string | null
  isTyping: boolean
  open: () => void
  close: () => void
  toggle: () => void
  addMessage: (msg: ChatMessage) => void
  setSession: (token: string) => void
  setWilayah: (w: string) => void
  setTyping: (v: boolean) => void
  clearChat: () => void
}

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [],
      sessionToken: null,
      wilayah: null,
      isTyping: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      setSession: (token) => set({ sessionToken: token }),
      setWilayah: (w) => set({ wilayah: w }),
      setTyping: (v) => set({ isTyping: v }),
      clearChat: () => set({ messages: [], sessionToken: null }),
    }),
    {
      name: 'chatbot-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-50),
        sessionToken: state.sessionToken,
        wilayah: state.wilayah,
      }),
    }
  )
)