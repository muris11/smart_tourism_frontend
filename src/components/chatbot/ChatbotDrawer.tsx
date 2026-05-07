'use client'

import { ArrowLeft, X } from 'lucide-react'
import { useChatbot } from '@/hooks/useChatbot'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

export default function ChatbotDrawer() {
  const { messages, isTyping, sendMessage, close, error } = useChatbot()

  return (
    <div className="fixed bottom-4 right-4 z-[110] flex h-[680px] w-[430px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(38,24,20,0.14)] animate-slide-up max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:h-[88vh] max-sm:w-full max-sm:rounded-none">
      <div className="flex justify-center pt-3 sm:hidden">
        <div className="h-1.5 w-14 rounded-full bg-slate-200" />
      </div>
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:text-brand-navy"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex flex-col">
            <div className="text-lg font-semibold leading-none text-brand-navy">
              CITRA
            </div>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Ciayumajakuning Assistant
            </span>
          </div>
        </div>
        <button
          onClick={close}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="hide-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-[#fbfbfb] p-4">
        {messages.length === 0 ? (
          <>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Mulai percakapan
              </p>
              <p className="text-sm leading-7 text-slate-700">
                Jelaskan tujuanmu dengan singkat. Misalnya: mencari tempat makan malam yang tenang, ruang nongkrong untuk kerja ringan, atau itinerary satu hari di Cirebon.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(138,90,68,0.18)] bg-[rgba(138,90,68,0.08)]">
                <span className="text-xs font-semibold text-brand-navy">C</span>
              </div>
              <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700 shadow-sm">
                Halo, saya CITRA. Saya bisa bantu menyusun ide perjalanan, mencari tempat, atau mempersempit pilihan berdasarkan suasana yang kamu inginkan.
              </div>
            </div>

            <div className="ml-11 flex flex-wrap gap-2">
              <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-[var(--color-brand)] hover:text-brand-navy">
                Tempat nongkrong tenang
              </button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-[var(--color-brand)] hover:text-brand-navy">
                Kuliner khas Cirebon
              </button>
            </div>
          </>
        ) : null}

        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isTyping ? (
          <div className="flex items-center gap-2 pl-1 text-sm text-slate-400">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce">●</span>
            <span className="animate-bounce">●</span>
          </div>
        ) : null}

        {error ? <p className="text-center text-xs text-red-500">{error}</p> : null}
      </div>

      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  )
}
