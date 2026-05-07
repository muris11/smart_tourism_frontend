'use client'

import { useChatbot } from '@/hooks/useChatbot'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

export default function ChatbotDrawer() {
  const { messages, isTyping, sendMessage, close, error } = useChatbot()

  return (
    <div className="fixed right-6 bottom-24 z-50 flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:w-96">
      <div className="flex items-center justify-between bg-[var(--color-brand)] px-4 py-3 text-white">
        <div>
          <p className="text-sm font-semibold">Smart Tourism Bot</p>
          <p className="text-xs opacity-80">Tanya soal wisata Ciayumajakuning</p>
        </div>
        <button onClick={close} className="opacity-70 hover:opacity-100">✕</button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? <p className="mt-8 text-center text-sm text-gray-400">Halo! Tanya saya tentang wisata, kuliner, atau tempat nongkrong di Ciayumajakuning.</p> : null}
        {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
        {isTyping ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
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
