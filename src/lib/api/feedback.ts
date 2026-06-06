import apiClient from './client'
import { ApiResponse } from '@/types'

export interface FeedbackPayload {
  feature: 'chatbot' | 'recommendation' | 'planning'
  rating: number // 1 (thumbs up) or -1 (thumbs down), or 1-5
  comment?: string
  context?: any
}

export const feedbackApi = {
  /** Submit feedback */
  submit: async (payload: FeedbackPayload): Promise<any> => {
    const response = await apiClient.post<ApiResponse<any>>('/feedback', payload)
    return response.data
  },
}
