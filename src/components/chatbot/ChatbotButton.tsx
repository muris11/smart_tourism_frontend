'use client'

import { BotMessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useChatbotStore } from '@/stores/chatbotStore'
import { useUIStore } from '@/stores/uiStore'

interface ChatbotButtonProps {
  className?: string
}

export default function ChatbotButton({ className }: ChatbotButtonProps) {
  const { isOpen, toggle } = useChatbotStore()
  const chatbotOffset = useUIStore((state) => state.chatbotOffset)

  if (isOpen) return null

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'group fixed right-4 z-[100] flex cursor-pointer items-center justify-center rounded-full border border-white/70 bg-citra-primary text-citra-on-primary shadow-floating transition-all duration-300 hover:-translate-y-0.5 hover:shadow-modal active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 sm:right-5 lg:right-6',
        'h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16',
        'bottom-[70px] sm:bottom-6 lg:bottom-6',
        className
      )}
      aria-label="Buka chatbot SITA"
      title="Buka chatbot SITA"
    >
      <BotMessageSquare
        className="h-5 w-5 stroke-white sm:h-6 sm:w-6 lg:h-7 lg:w-7"
        strokeWidth={2}
      />
    </button>
  )
}