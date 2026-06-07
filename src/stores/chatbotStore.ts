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
  guestQuestionCount: number
  guestCooldownUntil: number | null
  isMinimized: boolean
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
  setIsMinimized: (isMinimized: boolean) => void
  toggleMinimize: () => void
}

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [],
      sessionToken: null,
      wilayah: null,
      isTyping: false,
      guestQuestionCount: 0,
      guestCooldownUntil: null,
      isMinimized: false,

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
        set({
          messages: [],
          sessionToken: null,
          wilayah: null,
          guestQuestionCount: 0,
          guestCooldownUntil: null,
          isMinimized: false,
        })
      },

      setIsMinimized: (isMinimized) => set({ isMinimized }),

      toggleMinimize: () => set((s) => ({ isMinimized: !s.isMinimized })),
    }),
    {
      name: 'chatbot-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-50),
        sessionToken: state.sessionToken,
        wilayah: state.wilayah,
        guestQuestionCount: state.guestQuestionCount,
        guestCooldownUntil: state.guestCooldownUntil,
        isMinimized: state.isMinimized,
      }),
    }
  )
)