'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Send, Square } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ChatInputProps {
  onSend: (message: string) => void
  onStop?: () => void
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

export default function ChatInput({
  onSend,
  onStop,
  isLoading = false,
  disabled = false,
  className,
}: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`
    }
  }, [input])

  const handleSubmit = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={cn('border-t border-slate-100 bg-white p-3', className)}>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan sesuatu tempat di Ciayumajakuning..."
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              'w-full resize-none overflow-hidden rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition-all placeholder:text-slate-400',
              'focus:border-slate-400 focus:ring-1 focus:ring-slate-400',
              'disabled:bg-slate-50 disabled:cursor-not-allowed',
              'min-h-10 max-h-20'
            )}
            style={{ height: 'auto' }}
          />
        </div>

        {isLoading && onStop ? (
          <button
            onClick={onStop}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled || isLoading}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
              'bg-slate-100 text-slate-600 transition-all duration-300',
              'text-slate-600 transition-all duration-300',
              'hover:scale-105 hover:text-green-700',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}