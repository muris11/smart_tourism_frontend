'use client'

import { MessageCircle } from 'lucide-react'
import { useChatbotStore } from '@/stores/chatbotStore'
import ChatbotDrawer from './ChatbotDrawer'

export default function ChatbotButton() {
  const { isOpen, toggle } = useChatbotStore()

  return (
    <>
      <button onClick={toggle} className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand)] text-white shadow-lg transition-colors hover:bg-[var(--color-brand-dark)]" aria-label="Buka chatbot">
        <MessageCircle className="h-6 w-6" />
      </button>
      {isOpen ? <ChatbotDrawer /> : null}
    </>
  )
}
