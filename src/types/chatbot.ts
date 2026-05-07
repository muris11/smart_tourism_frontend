export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

export interface ChatSession {
  session_token: string
  messages: ChatMessage[]
  wilayah?: string
}

export interface AskChatbotPayload {
  message: string
  session_token?: string
  latitude?: number
  longitude?: number
  wilayah?: string
}

export interface ChatbotResponse {
  answer: string
  session_token: string
  wilayah?: string
  sources?: string[]
}
