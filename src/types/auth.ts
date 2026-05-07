export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'pengunjung'
  avatar?: string
  wilayah_asal?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  user: User
  token: string
  token_type: string
}
