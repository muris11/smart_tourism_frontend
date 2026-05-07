'use client'

import { useState } from 'react'

interface Props {
  onSend: (message: string) => void | Promise<void>
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    void onSend(trimmed)
    setValue('')
  }

  return (
    <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-3">
      <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          handleSend()
        }
      }} disabled={disabled} placeholder="Ketik pertanyaan kamu..." className="flex-1 rounded-xl bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] disabled:opacity-50" />
      <button onClick={handleSend} disabled={disabled || !value.trim()} className="rounded-xl bg-[var(--color-brand)] px-3 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-brand-dark)] disabled:opacity-50">Kirim</button>
    </div>
  )
}
