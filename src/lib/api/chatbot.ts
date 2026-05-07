import { ApiResponse } from '@/types/api'
import { AskChatbotPayload, ChatbotResponse, ChatSession } from '@/types/chatbot'
import { apiClient } from './client'

export const chatbotApi = {
  ask: async (payload: AskChatbotPayload): Promise<ChatbotResponse> => {
    const { data } = await apiClient.post<ApiResponse<ChatbotResponse>>('/chatbot/ask', payload)
    return data.data as ChatbotResponse
  },
  history: async (sessionToken: string): Promise<ChatSession> => {
    const { data } = await apiClient.get<ApiResponse<ChatSession>>(`/chatbot/history/${sessionToken}`)
    return data.data as ChatSession
  },
}
