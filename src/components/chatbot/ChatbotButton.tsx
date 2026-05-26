'use client'

import { Headphones, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useChatbotStore } from '@/stores/chatbotStore'

interface ChatbotButtonProps {
  className?: string
}

export default function ChatbotButton({ className }: ChatbotButtonProps) {
  const { isOpen, toggle } = useChatbotStore()

  return (
    <button
      onClick={toggle}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95',
        isOpen
          ? 'bg-slate-700 hover:bg-slate-800'
          : 'bg-[#1a1f2e] hover:bg-[#1a1f2e]/90',
        className
      )}
      aria-label="Buka chatbot"
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <Headphones className="h-6 w-6 text-white" />
      )}
    </button>
  )
}
