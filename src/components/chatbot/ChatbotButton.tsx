'use client'

import { useChatbotStore } from '@/stores/chatbotStore'
import ChatbotDrawer from './ChatbotDrawer'

export default function ChatbotButton() {
  const { isOpen, toggle } = useChatbotStore()

  return (
    <>
      <button
        onClick={toggle}
        className={`fixed right-8 bottom-8 z-40 flex items-center gap-3 rounded-full border border-white/10 bg-brand-navy px-6 py-3.5 text-white shadow-[0_10px_40px_rgba(7,28,83,0.3)] transition-all duration-300 hover:scale-105 hover:bg-blue-900 ${isOpen ? 'pointer-events-none translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}
        aria-label="Buka chatbot"
      >
        <span className="font-semibold tracking-wide">CITRA</span>
        <span className="text-brand-green">.</span>
      </button>
      {isOpen ? <ChatbotDrawer /> : null}
    </>
  )
}
