'use client'

import { Bot, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useChatbotStore } from '@/stores/chatbotStore'
import { useUIStore } from '@/stores/uiStore'

interface ChatbotButtonProps {
  className?: string
}

export default function ChatbotButton({ className }: ChatbotButtonProps) {
  const { isOpen, toggle } = useChatbotStore()
  const chatbotOffset = useUIStore(
    (state) => state.chatbotOffset
  )

  return (
    <button
      onClick={toggle}
      className={cn(
        'fixed right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95',
        chatbotOffset ? 'bottom-24' : 'bottom-6',
        isOpen
          ? 'bg-slate-700 hover:bg-slate-800'
          : 'bg-gradient-to-tr from-brand to-emerald-500 hover:from-brand-dark hover:to-emerald-600 ring-4 ring-emerald-50',
        className
      )}
      aria-label="Buka chatbot"
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Bot className="h-7 w-7 text-white" fill="white" />
          <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-emerald-100 animate-pulse fill-emerald-100" />
        </div>
      )}
    </button>
  )
}
