import { cn } from '@/lib/utils/cn'
import { ChatMessage as ChatMessageType } from '@/types/chatbot'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[85%] rounded-2xl px-3 py-2 text-sm', isUser ? 'rounded-br-sm bg-[var(--color-brand)] text-white' : 'rounded-bl-sm bg-gray-100 text-gray-800')}>
        {message.content}
      </div>
    </div>
  )
}
