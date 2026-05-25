import {
  ChatRequest,
  ChatbotResponse,
  ChatHistoryResponse
} from '@/types'
import { apiClient } from './client'

/** Base URL untuk endpoint chatbot */
const BASE_URL = '/chatbot'

export const chatbotApi = {
  /**
   * Kirim pesan ke chatbot RAG
   * POST /api/v1/chatbot/ask
   */
  ask: async (payload: ChatRequest): Promise<ChatbotResponse['data']> => {
    const { data } = await apiClient.post<ChatbotResponse>(`${BASE_URL}/ask`, payload)
    return data.data
  },

  /**
   * Ambil riwayat percakapan berdasarkan session token
   * GET /api/v1/chatbot/history/{session_token}
   */
  history: async (sessionToken: string): Promise<ChatHistoryResponse['data']> => {
    const { data } = await apiClient.get<ChatHistoryResponse>(`${BASE_URL}/history/${sessionToken}`)
    return data.data
  },

  /**
   * Hapus riwayat percakapan (reset sesi)
   * DELETE /api/v1/chatbot/history/{session_token}
   */
  deleteHistory: async (sessionToken: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/history/${sessionToken}`)
  },
}