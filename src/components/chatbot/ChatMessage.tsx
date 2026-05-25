'use client'

import { User, Bot, Clock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { ChatMessage as ChatMessageType } from '@/types'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface ChatMessageProps {
  message: ChatMessageType
  isLast?: boolean
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (!message || !message.role) {
    return null
  }

  const isUser = message.role === 'user'

  const formatContent = (content: string) => {
    if (!content) return ''

    let formatted = content

    // Format bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')

    // Format line breaks
    formatted = formatted.replace(/\n/g, '<br/>')

    // Format Google Maps links with icon
    formatted = formatted.replace(
      /(https?:\/\/maps\.app\.goo\.gl\/[^\s)]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-brand-green hover:underline"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Lihat di Maps</a>'
    )

    formatted = formatted.replace(
      /(https?:\/\/www\.google\.com\/maps\/[^\s)]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-brand-green hover:underline"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Lihat di Maps</a>'
    )

    return formatted
  }

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        isUser ? 'bg-brand-navy' : 'bg-brand-green'
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      <div className={cn(
        'max-w-[85%] rounded-2xl px-4 py-2.5',
        isUser
          ? 'rounded-tr-none bg-brand-navy text-white'
          : 'rounded-tl-none bg-white border border-slate-200 shadow-sm'
      )}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-100">
            <Bot className="h-3.5 w-3.5 text-brand-green" />
            <span className="text-xs font-semibold text-brand-green">CITRA</span>
          </div>
        )}

        {message.content && (
          <div
            className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word"
            dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
          />
        )}

        {message.timestamp && (
          <p className={cn(
            'mt-1.5 text-[10px] flex items-center gap-1',
            isUser ? 'text-white/50' : 'text-slate-400'
          )}>
            <Clock className="h-3 w-3" />
            {format(new Date(message.timestamp), 'HH:mm', { locale: id })}
          </p>
        )}
      </div>
    </div>
  )
}