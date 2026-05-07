export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T | null
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number | null
    to: number | null
  }
}

export interface ListFilter {
  wilayah?: string
  sentimen?: string
  sort?: 'rating' | 'terbaru' | 'nama'
  per_page?: number
  q?: string
  page?: number
}
