'use client'

import { useEffect, useRef, useState } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useChatbot } from '@/hooks/useChatbot'
import { useChatbotStore } from '@/stores/chatbotStore'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { X, MapPin, Headphones, Trash2, ChevronDown } from 'lucide-react'
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
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        onClick={close}
      />

      <div
        className={cn(
          'fixed z-50 flex flex-col bg-white shadow-2xl transition-all duration-300',
          'bottom-4 left-4 right-4 h-[85vh] rounded-2xl border border-slate-200',
          'lg:bottom-6 lg:right-6 lg:left-auto lg:h-[600px] lg:w-[400px] lg:rounded-2xl lg:border lg:border-slate-200',
          isMinimized && '!h-14 overflow-hidden',
          className
        )}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[#0d7a6a] to-[#0a6458] px-4 py-3 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                <Headphones className="h-4 w-4 text-white" />
              </div>
            <div>
              <h3 className="text-sm font-semibold text-white">SITA</h3>
              <p className="text-[10px] text-white/60">Layanan Pelanggan AI</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
              title={isMinimized ? 'Buka' : 'Minimalkan'}
            >
              <ChevronDown className={cn('h-4 w-4 transition-transform', isMinimized && 'rotate-180')} />
            </button>

            <button
              onClick={handleEnableLocation}
              disabled={locationLoading}
              className={cn(
                'rounded-lg p-1.5 transition-colors',
                showLocation && lat
                  ? 'bg-white/15 text-white'
                  : 'text-white/50 hover:bg-white/10',
                locationLoading && 'opacity-50 cursor-not-allowed'
              )}
              title="Aktifkan lokasi untuk rekomendasi terdekat"
            >
              <MapPin className="h-4 w-4" />
            </button>

            <button
              onClick={handleClearChat}
              className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
              title="Hapus percakapan"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <button
              onClick={close}
              className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {showLocation && (
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2 text-xs border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  {lat && lon && namaKota ? (
                    <span>
                      <span className="font-medium text-brand-deep">{namaKota}</span>
                      <span className="text-slate-300 ml-1">&bull; {lat.toFixed(3)}, {lon.toFixed(3)}</span>
                    </span>
                  ) : locationLoading ? (
                    'Mendapatkan lokasi...'
                  ) : (
                    'Aktifkan lokasi untuk rekomendasi terdekat'
                  )}
                </span>
                <button
                  onClick={() => setShowLocation(false)}
                  className="text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {safeMessages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center px-4">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d7a6a] to-[#0a6458] shadow-md">
                    <Headphones className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-base font-semibold text-brand-deep font-display">
                    Halo! Ada yang bisa dibantu?
                  </h4>
                  <p className="max-w-xs text-sm leading-relaxed text-slate-500">
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
                        className="rounded-full bg-slate-50 px-3.5 py-1.5 text-xs text-slate-500 transition-all hover:bg-brand hover:text-white border border-slate-200"
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
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                        <Headphones className="h-3.5 w-3.5 text-brand" />
                      </div>
                      <div className="rounded-xl rounded-tl-none bg-slate-100 px-4 py-3">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
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
