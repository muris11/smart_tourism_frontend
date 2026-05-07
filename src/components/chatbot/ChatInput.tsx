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
    <div className="border-t border-slate-200 bg-white px-4 py-4">
      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-2 transition-all focus-within:border-brand-navy focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-navy">
        <div className="flex items-end gap-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            disabled={disabled}
            rows={1}
            placeholder="Tulis tujuan, suasana, atau jenis tempat yang ingin kamu cari..."
            className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 outline-none placeholder:text-slate-400 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className="rounded-[1.1rem] bg-brand-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand)] disabled:opacity-50"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  )
}
