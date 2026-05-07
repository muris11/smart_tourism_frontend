import Cookies from 'js-cookie'
import { ApiResponse } from '@/types/api'
import { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth'
import { apiClient, TOKEN_KEY } from './client'

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', payload)
    if (data.data?.token) {
      Cookies.set(TOKEN_KEY, data.data.token, { expires: 7, sameSite: 'lax' })
    }
    return data.data as AuthResponse
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', payload)
    if (data.data?.token) {
      Cookies.set(TOKEN_KEY, data.data.token, { expires: 7, sameSite: 'lax' })
    }
    return data.data as AuthResponse
  },
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
    Cookies.remove(TOKEN_KEY)
  },
  me: async () => {
    const { data } = await apiClient.get<ApiResponse<AuthResponse['user']>>('/auth/me')
    return data.data
  },
}
