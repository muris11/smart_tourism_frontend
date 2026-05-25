import { Wilayah } from '@/lib/constants/wilayah'

/** Request payload untuk mengirim pesan ke chatbot */
export interface ChatRequest {
  message: string
  session_token?: string | null
  latitude?: number | null
  longitude?: number | null
}

/** Pesan dalam percakapan */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
  references?: ChatReference[]
}

/** Referensi tempat yang direkomendasikan chatbot */
export interface ChatReference {
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: Wilayah
  link_maps?: string | null
}

/** Response dari backend FastAPI untuk chat */
export interface ChatbotResponse {
  success: boolean
  message: string
  data: {
    session_token: string
    answer: string
    wilayah_terdeteksi?: Wilayah | null
    referensi?: ChatReference[]
    messages_count?: number
  }
}

/** Response dari backend FastAPI untuk riwayat chat */
export interface ChatHistoryResponse {
  success: boolean
  message: string
  data: {
    session_token: string
    messages: ChatMessage[]
    created_at: string
    updated_at: string
  }
}

/** Alias untuk ChatRequest (untuk konsistensi) */
export type AskChatbotPayload = ChatRequest

/** Data chat yang siap digunakan frontend (tanpa wrapper) */
export interface ChatData {
  session_token: string
  answer: string
  wilayah_terdeteksi?: string | null
  referensi?: ChatReference[]
  messages_count?: number
}