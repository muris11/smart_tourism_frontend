/** User data dari backend FastAPI */
export interface User {
  id: string
  nama: string
  email: string
  role: 'admin' | 'pengunjung'
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

/** Response dari backend FastAPI untuk login */
export interface LoginResponse {
  success: boolean
  message: string
  data: {
    access_token: string
    token_type: string
    role: 'admin' | 'pengunjung'
    user_id: string
    nama: string
  }
}

/** Response dari backend FastAPI untuk register */
export interface RegisterResponse {
  success: boolean
  message: string
  data: null
}

/** Response dari backend FastAPI untuk /me */
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