'use client'

import { useEffect, useRef, useState } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useChatbot } from '@/hooks/useChatbot'
import { useChatbotStore } from '@/stores/chatbotStore'
import { useAuthStore } from '@/stores/authStore'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { X, MapPin, Trash2, ChevronDown, Compass, Utensils, Coffee, Calendar, BotMessageSquare, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ChatbotDrawerProps {
  className?: string
}

export default function ChatbotDrawer({ className }: ChatbotDrawerProps) {
  const { isOpen, close, messages, clearChat, isTyping, guestCooldownUntil, incrementGuestQuestion, resetGuestLimit } = useChatbotStore()
  const { sendMessage, isLoading, stopGenerating, isTypingEffect, streamingContent } = useChatbot()
  const { user } = useAuthStore()
  const { lat, lon, getLocation, isLoading: locationLoading } = useGeolocation()
  const [showLocation, setShowLocation] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showConfirmTrash, setShowConfirmTrash] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ========== FUNGSI FORMAT LINK MAPS UNTUK STREAMING ==========
  const formatStreamingLink = (text: string) => {
    if (!text) return ''
    return text
      // Ganti link maps.app.goo.gl
      .replace(/(https?:\/\/maps\.app\.goo\.gl\/[^\s\n<)]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-blue-600 underline underline-offset-2 hover:text-blue-700 font-medium break-all"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Lihat di Maps</a>')
      // Ganti link google.com/maps
      .replace(/(https?:\/\/www\.google\.com\/maps\/[^\s\n<)]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-blue-600 underline underline-offset-2 hover:text-blue-700 font-medium break-all"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Lihat di Maps</a>')
      .replace(/\n/g, '<br/>')
  }
  // ============================================================

  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!user && guestCooldownUntil && guestCooldownUntil > now) {
      const interval = setInterval(() => setNow(Date.now()), 1000)
      return () => clearInterval(interval)
    }
  }, [user, guestCooldownUntil, now])

  const isInCooldown = !user && guestCooldownUntil && guestCooldownUntil > now
  const cooldownRemainingSeconds = Math.max(0, Math.ceil(((guestCooldownUntil || 0) - now) / 1000))
  const cooldownMinutes = Math.floor(cooldownRemainingSeconds / 60)
  const cooldownSeconds = cooldownRemainingSeconds % 60
  const cooldownText = `${cooldownMinutes.toString().padStart(2, '0')}:${cooldownSeconds.toString().padStart(2, '0')}`

  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [messages, isTyping, isTypingEffect, streamingContent, isMinimized])

  const handleSend = async (message: string) => {
    if (isInCooldown) return
    await sendMessage(message, {
      lat: showLocation ? lat || undefined : undefined,
      lon: showLocation ? lon || undefined : undefined,
    })
    if (!user) incrementGuestQuestion()
  }

  const confirmClearChat = () => {
    clearChat()
    setShowConfirmTrash(false)
  }

  const handleEnableLocation = () => {
    getLocation()
    setShowLocation(true)
  }

  if (!isOpen) return null
  const safeMessages = messages || []

  return (
    <>
      {/* Overlay untuk mobile - hanya muncul saat tidak diminimalkan */}
      {!isMinimized && (
        <div
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Drawer Chatbot */}
      <div
        className={cn(
          'fixed z-50 flex flex-col bg-white shadow-2xl transition-all duration-300',
          isMinimized
            ? 'bottom-4 left-4 right-4 lg:bottom-6 lg:right-6 lg:left-auto rounded-2xl border border-slate-200'
            : 'bottom-4 left-4 right-4 rounded-2xl border border-slate-200 lg:bottom-6 lg:right-6 lg:left-auto lg:w-[380px] lg:rounded-2xl',
          isMinimized ? 'h-14' : 'h-[85vh] lg:h-[560px]',
          className
        )}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between bg-linear-to-r from-[#0d7a6a] to-[#0a6458] px-4 py-3 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <BotMessageSquare className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">SITA</h3>
              <p className="text-[10px] text-white/60">Layanan Pelanggan AI</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {!isMinimized && (
              <>
                <button onClick={handleEnableLocation} disabled={locationLoading} className={cn('rounded-lg p-1.5 transition-colors cursor-pointer', showLocation && lat ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white', locationLoading && 'opacity-50 cursor-not-allowed')}>
                  <MapPin className="h-4 w-4" />
                </button>
                <button onClick={() => setShowConfirmTrash(true)} className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
            <button onClick={close} className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* BODY DRAWER - hanya tampil saat tidak diminimalkan */}
        {!isMinimized && (
          <>
            {/* Lokasi Bar */}
            {showLocation && (
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2 text-xs border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  {lat && lon ? `${lat.toFixed(3)}, ${lon.toFixed(3)}` : locationLoading ? 'Mendapatkan lokasi...' : 'Aktifkan lokasi untuk rekomendasi terdekat'}
                </span>
                <button onClick={() => setShowLocation(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* AREA PESAN */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {safeMessages.length === 0 ? (
                // Tampilan awal (empty state)
                <div className="flex h-full flex-col items-center justify-center text-center px-4">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#0d7a6a] to-[#0a6458] shadow-md">
                    <BotMessageSquare className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-base font-semibold text-brand-deep font-display">Halo! Ada yang bisa dibantu?</h4>
                  <p className="max-w-xs text-sm leading-relaxed text-slate-500 mb-6">Tanyakan tentang wisata, kuliner, atau tempat nongkrong di Ciayumajakuning.</p>
                  <div className="flex flex-col gap-2 w-full max-w-70">
                    {[
                      { icon: <Compass className="w-3.5 h-3.5 text-brand" />, label: 'Wisata Keluarga di Kuningan', query: 'Rekomendasi wisata keluarga di Kuningan' },
                      { icon: <Utensils className="w-3.5 h-3.5 text-orange-600" />, label: 'Kuliner Malam di Cirebon', query: 'Kuliner malam legendaris di Cirebon' },
                      { icon: <Coffee className="w-3.5 h-3.5 text-slate-500" />, label: 'Tempat Nongkrong Indramayu', query: 'Tempat nongkrong estetik di Indramayu' },
                      { icon: <Calendar className="w-3.5 h-3.5 text-citra-sand" />, label: 'Buat Rencana Trip 2 Hari', query: 'Buatkan rencana perjalanan 2 hari di Ciayumajakuning' },
                    ].map((item) => (
                      <button key={item.query} onClick={() => handleSend(item.query)} className="w-full flex items-center gap-2 text-left rounded-xl bg-slate-50 hover:bg-citra-primary-soft px-4 py-2.5 text-xs font-medium text-slate-600 transition-all border border-slate-200 cursor-pointer">
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Pesan yang sudah tersimpan */}
                  {safeMessages.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg} onFeedback={resetGuestLimit} />
                  ))}

                  {/* EFEK TYPING STREAMING (dengan format link Maps) */}
                  {isTypingEffect && streamingContent && (
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                        <BotMessageSquare className="h-3.5 w-3.5 text-brand" />
                      </div>
                      <div className="rounded-xl rounded-tl-none bg-slate-100 px-4 py-3 max-w-[85%] overflow-hidden">
                        <div
                          className="text-sm text-slate-700 whitespace-pre-wrap break-words"
                          dangerouslySetInnerHTML={{ __html: formatStreamingLink(streamingContent) }}
                        />
                        <span className="inline-block w-0.5 h-4 bg-brand ml-0.5 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* LOADING INDICATOR (animasi titik-titik) */}
                  {isTyping && !isTypingEffect && (
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                        <BotMessageSquare className="h-3.5 w-3.5 text-brand" />
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

            {/* COOLDOWN / INPUT */}
            {isInCooldown ? (
              <div className="border-t border-slate-100 bg-red-50 p-3 text-center">
                <p className="text-xs text-red-600 font-medium mb-1">Batas pesan tamu tercapai. Tunggu {cooldownText} untuk lanjut.</p>
                <p className="text-[10px] text-red-500/80"><a href="/login" className="underline font-semibold hover:text-red-700">Login</a> atau beri umpan balik untuk mereset batasan.</p>
              </div>
            ) : (
              <ChatInput onSend={handleSend} onStop={stopGenerating} isLoading={isLoading} />
            )}
          </>
        )}

        {/* MODAL KONFIRMASI HAPUS CHAT */}
        {showConfirmTrash && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
            <div className="bg-white rounded-xl p-5 shadow-xl w-[85%] max-w-sm text-center">
              <h4 className="font-semibold text-slate-800 mb-2 font-display">Mulai Sesi Baru?</h4>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">Percakapan saat ini akan ditutup. Lanjutkan?</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowConfirmTrash(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">Batal</button>
                <button onClick={confirmClearChat} className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 cursor-pointer">Ya, Mulai Baru</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}