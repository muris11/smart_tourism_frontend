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
  const chatbotOffset = useUIStore(
    (state) => state.chatbotOffset
  )

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'group fixed right-4 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/70 text-citra-on-primary shadow-floating transition-all duration-300 hover:-translate-y-0.5 hover:shadow-modal active:translate-y-0 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas',
        'sm:right-5 sm:h-16 sm:w-16 lg:right-6',
        chatbotOffset
          ? 'bottom-[calc(5.5rem+env(safe-area-inset-bottom))] sm:bottom-24'
          : 'bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6',
        isOpen
          ? 'bg-citra-forest hover:bg-citra-forest-elevated'
          : 'bg-citra-primary ring-4 ring-citra-primary-soft hover:bg-citra-primary-hover',
        className
      )}
      aria-label={isOpen ? 'Tutup chatbot SITA' : 'Buka chatbot SITA'}
      aria-expanded={isOpen}
      title={isOpen ? 'Tutup chatbot SITA' : 'Buka chatbot SITA'}
    >
      {!isOpen && (
        <div className="relative flex items-center justify-center">
          <BotMessageSquare
            className="h-7 w-7 sm:h-8 sm:w-8 stroke-white"
            strokeWidth={2}
          />
        </div>
      )}
    </button>
  )
}
