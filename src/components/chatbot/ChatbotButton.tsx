'use client'

import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useChatbotStore } from '@/stores/chatbotStore'

interface ChatbotButtonProps {
  className?: string
}

export default function ChatbotButton({ className }: ChatbotButtonProps) {
  const { isOpen, toggle } = useChatbotStore()

  console.log('ChatbotButton - isOpen:', isOpen)

  return (
    <button
      onClick={toggle}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110',
        isOpen
          ? 'bg-slate-700 hover:bg-slate-800'
          : 'bg-brand-navy hover:bg-brand-navy/90',
        className
      )}
      aria-label="Chatbot"
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <MessageCircle className="h-6 w-6 text-white" />
      )}
    </button>
  )
}