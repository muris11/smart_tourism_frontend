'use client'

import { useEffect, useRef, useState } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useChatbot } from '@/hooks/useChatbot'
import { useChatbotStore } from '@/stores/chatbotStore'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { X, MapPin, Bot, Trash2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ChatbotDrawerProps {
  className?: string
}

export default function ChatbotDrawer({ className }: ChatbotDrawerProps) {
  const { isOpen, close, messages, clearChat, isTyping } = useChatbotStore()
  const { sendMessage, isLoading, stopGenerating } = useChatbot()
  const { lat, lon, namaKota, getLocation, isLoading: locationLoading } = useGeolocation()
  const [showLocation, setShowLocation] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isMinimized])

  const handleSend = async (message: string) => {
    await sendMessage(message, {
      lat: showLocation ? lat || undefined : undefined,
      lon: showLocation ? lon || undefined : undefined,
    })
  }

  const handleClearChat = () => {
    if (confirm('Hapus semua percakapan?')) {
      clearChat()
    }
  }

  const handleEnableLocation = () => {
    getLocation()
    setShowLocation(true)
  }

  if (!isOpen) return null

  const safeMessages = messages || []

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={close}
      />

      <div
        className={cn(
          `
            fixed z-50
            flex flex-col
            bg-white
            shadow-xl
            transition-all duration-300
          `,
          `
            bottom-4 left-4 right-4
            h-[85vh]
            rounded-3xl
            border border-slate-200
          `,
          `
            lg:bottom-6 lg:right-6
            lg:left-auto
            lg:h-140 lg:w-105
            lg:rounded-3xl
            lg:border lg:border-slate-200
            lg:shadow-2xl
          `,
          isMinimized && 'h-15 lg:h-15 overflow-hidden',
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-brand-navy px-4 py-3 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">CITRA Assistant</h3>
              <p className="text-xs text-white/70">AI Tourism Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
              title={isMinimized ? 'Buka' : 'Minimalkan'}
            >
              <ChevronDown className={cn('h-5 w-5 transition-transform', isMinimized && 'rotate-180')} />
            </button>

            <button
              onClick={handleEnableLocation}
              disabled={locationLoading}
              className={cn(
                'rounded-full p-2 transition-colors',
                showLocation && lat
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10',
                locationLoading && 'opacity-50 cursor-not-allowed'
              )}
              title="Aktifkan lokasi untuk rekomendasi terdekat"
            >
              <MapPin className="h-4 w-4" />
            </button>

            <button
              onClick={handleClearChat}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
              title="Hapus percakapan"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <button
              onClick={close}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {showLocation && (
              <div className="flex items-center justify-between bg-slate-100 px-4 py-2 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-brand-navy" />
                  {lat && lon && namaKota ? (
                    <span>
                      <span className="font-medium text-brand-navy">{namaKota}</span>
                      <span className="text-slate-400 ml-1">• {lat.toFixed(3)}, {lon.toFixed(3)}</span>
                    </span>
                  ) : locationLoading ? (
                    'Mendapatkan lokasi...'
                  ) : (
                    'Aktifkan lokasi untuk rekomendasi terdekat'
                  )}
                </span>
                <button
                  onClick={() => setShowLocation(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {safeMessages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Bot className="h-8 w-8 text-brand-navy" />
                  </div>
                  <h4 className="mb-2 font-semibold text-brand-navy">
                    Halo! Ada yang bisa dibantu?
                  </h4>
                  <p className="max-w-xs text-sm text-slate-500">
                    Tanyakan tentang wisata, kuliner, atau tempat nongkrong di
                    Ciayumajakuning. Saya siap membantu!
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {[
                      'Wisata alam di Kuningan?',
                      'Kuliner enak di Cirebon',
                      'Tempat nongkrong di Indramayu',
                      'Rekomendasi wisata dekat sini',
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSend(suggestion)}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600 transition-all hover:bg-slate-200 hover:text-brand-navy"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {safeMessages.map((msg, idx) => (
                    <ChatMessage
                      key={idx}
                      message={msg}
                      isLast={idx === safeMessages.length - 1}
                    />
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <Bot className="h-4 w-4 text-brand-navy" />
                      </div>
                      <div className="rounded-2xl rounded-tl-none bg-slate-100 px-4 py-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <ChatInput
              onSend={handleSend}
              onStop={stopGenerating}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </>
  )
}