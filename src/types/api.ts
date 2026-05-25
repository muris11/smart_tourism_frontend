import { Wilayah } from '@/lib/constants/wilayah'

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T | null
  errors?: Record<string, string[]>
}

/** Paginate Response */
export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

/** Filter untuk wisata */
export interface WisataFilter {
  wilayah?: Wilayah
  kategori?: string
  sentimen?: string
  q?: string
  sort_by?: 'rating' | 'sentimen'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/** Filter untuk kuliner */
export interface KulinerFilter {
  wilayah?: Wilayah
  jenis?: string
  sentimen?: string
  halal?: boolean
  q?: string
  sort_by?: 'rating' | 'sentimen'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/** Filter untuk nongkrong */
export interface NongkrongFilter {
  wilayah?: Wilayah
  sentimen?: string
  q?: string
  sort_by?: 'rating' | 'sentimen'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/** Generic filter */
export interface ListFilter {
  page?: number
  limit?: number
  search?: string
  sort_by?: string
  order?: 'asc' | 'desc'
}