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
  ask: async (
    payload: ChatRequest,
    options?: { userId?: string; debug?: boolean }
  ): Promise<ChatbotResponse['data']> => {
    const headers: Record<string, string> = {}
    if (options?.userId) headers['X-User-Id'] = options.userId
    if (options?.debug) headers['X-Debug-Info'] = 'true'

    const { data } = await apiClient.post<ChatbotResponse>(
      `${BASE_URL}/ask`,
      payload,
      { headers }
    )
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
  deleteHistory: async (sessionToken: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete<{ data: { message: string } }>(
      `${BASE_URL}/history/${sessionToken}`
    )
    return { message: data.data.message }
  },
}