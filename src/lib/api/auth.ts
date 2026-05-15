import Cookies from 'js-cookie'
import { ApiResponse } from '@/types/api'
import { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth'
import { apiClient, TOKEN_KEY } from './client'

export interface PreferencesPayload {
  kategori_favorit?: string[]
  wilayah_favorit?: string[]
  budget_min?: number
  budget_max?: number
  tipe_wisata?: string[]
}

export interface UserPreferences {
  id: number
  user_id: string
  kategori_favorit: string[] | null
  wilayah_favorit: string[] | null
  budget_min: number
  budget_max: number
  tipe_wisata: string[] | null
  updated_at: string
}

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
  me: async (): Promise<User | null> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me')
    return data.data ?? null
  },
  updateProfile: async (payload: { nama?: string; avatar_url?: string }): Promise<void> => {
    await apiClient.put('/auth/profile', payload)
  },
  getPreferences: async (): Promise<UserPreferences | null> => {
    const { data } = await apiClient.get<ApiResponse<UserPreferences>>('/preferences')
    return data.data ?? null
  },
  updatePreferences: async (payload: PreferencesPayload): Promise<void> => {
    await apiClient.put('/preferences', payload)
  },
}
