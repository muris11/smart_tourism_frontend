/** User data dari backend FastAPI */
export interface User {
  id: string
  nama: string
  email: string
  role: 'admin' | 'user'
  avatar_url?: string | null
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

/** Payload untuk login */
export interface LoginPayload {
  email: string
  password: string
}

/** Payload untuk register */
export interface RegisterPayload {
  nama: string
  email: string
  password: string
  password_confirmation: string
}

/** Response dari backend Laravel untuk login */
export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    token_type: string
  }
}

/** Response dari backend Laravel untuk register */
export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    token_type: string
  }
}

/** Response dari backend Laravel untuk /me */
export interface MeResponse {
  success: boolean
  message: string
  data: User
}

/** Auth data untuk frontend setelah diproses */
export interface AuthData {
  user: User
  token: string
  token_type: string
}