import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '@/types'
import { chatbotApi } from '@/lib/api/chatbot'

/** State untuk manajemen chatbot */
interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  sessionToken: string | null
  wilayah: string | null
  isTyping: boolean
  guestQuestionCount: number
  guestCooldownUntil: number | null
  open: () => void
  close: () => void
  toggle: () => void
  addMessage: (msg: ChatMessage) => void
  setSession: (token: string) => void
  setWilayah: (w: string) => void
  setTyping: (v: boolean) => void
  incrementGuestQuestion: () => void
  resetGuestLimit: () => void
  clearChat: () => void
}

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      messages: [],
      sessionToken: null,
      wilayah: null,
      isTyping: false,

      guestQuestionCount: 0,
      guestCooldownUntil: null,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      setSession: (token) => set({ sessionToken: token }),
      setWilayah: (w) => set({ wilayah: w }),
      setTyping: (v) => set({ isTyping: v }),
      incrementGuestQuestion: () => set((s) => {
        const count = s.guestQuestionCount + 1
        if (count >= 5) {
          return { guestQuestionCount: count, guestCooldownUntil: Date.now() + 2 * 60 * 1000 }
        }
        return { guestQuestionCount: count }
      }),
      resetGuestLimit: () => set({ guestQuestionCount: 0, guestCooldownUntil: null }),
      clearChat: () => {
        // Just clear local state to start a new session, do not delete from backend
        set({ messages: [], sessionToken: null, wilayah: null, guestQuestionCount: 0, guestCooldownUntil: null })
      },
    }),
    {
      name: 'chatbot-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-50),
        sessionToken: state.sessionToken,
        wilayah: state.wilayah,
        guestQuestionCount: state.guestQuestionCount,
        guestCooldownUntil: state.guestCooldownUntil,
      }),
    }
  )
)