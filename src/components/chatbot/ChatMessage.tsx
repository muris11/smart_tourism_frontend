import { cn } from '@/lib/utils/cn'
import { ChatMessage as ChatMessageType } from '@/types/chatbot'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-sm',
          isUser
            ? 'rounded-br-md bg-brand-navy text-white'
            : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
