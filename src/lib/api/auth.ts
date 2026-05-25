import Cookies from 'js-cookie'
import { apiClient, TOKEN_KEY } from './client'
import {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  MeResponse,
  AuthData,
  User
} from '@/types'

/** Payload untuk update preferences user */
export interface PreferencesPayload {
  kategori_favorit?: string[]
  wilayah_favorit?: string[]
  budget_min?: number
  budget_max?: number
  tipe_wisata?: string[]
}

/** Response preferences user */
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
  /**
   * Login user
   * POST /api/v1/auth/login
   */
  login: async (payload: LoginPayload): Promise<AuthData> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)

    const token = data.data.access_token
    if (token) {
      Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'lax' })
    }

    return {
      user: {
        id: data.data.user_id,
        nama: data.data.nama,
        email: payload.email,
        role: data.data.role,
      },
      token: token,
      token_type: data.data.token_type,
    }
  },

  /**
   * Register user baru
   * POST /api/v1/auth/register
   */
  register: async (payload: RegisterPayload): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<RegisterResponse>('/auth/register', payload)
    return { success: data.success, message: data.message }
  },

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout')
    } catch {
      // ignore
    } finally {
      Cookies.remove(TOKEN_KEY)
    }
  },

  /**
   * Get current user profile
   * GET /api/v1/auth/me
   */
  me: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get<MeResponse>('/auth/me')
      return data.data ?? null
    } catch {
      return null
    }
  },

  /**
   * Update user profile
   * PUT /api/v1/auth/profile
   */
  updateProfile: async (payload: { nama?: string; avatar_url?: string }): Promise<void> => {
    await apiClient.put('/auth/profile', payload)
  },

  /**
   * Get user preferences
   * GET /api/v1/preferences
   */
  getPreferences: async (): Promise<UserPreferences | null> => {
    try {
      const { data } = await apiClient.get<{ success: boolean; message: string; data: UserPreferences }>('/preferences')
      return data.data ?? null
    } catch {
      return null
    }
  },

  /**
   * Update user preferences
   * PUT /api/v1/preferences
   */
  updatePreferences: async (payload: PreferencesPayload): Promise<void> => {
    await apiClient.put('/preferences', payload)
  },
}