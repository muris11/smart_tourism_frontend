import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

/** Key untuk menyimpan token di cookies */
export const TOKEN_KEY = 'st_token'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === 'https://backend.smart-tourism-citra.web.id')

/** Axios instance untuk API calls */
export const apiClient: AxiosInstance = axios.create({
  baseURL: isLocalhost ? '/api' : API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 60000,
})

/**
 * Request interceptor: menambahkan Authorization token
 * ke header setiap request jika token tersedia
 */
apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = Cookies.get(TOKEN_KEY)
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Response interceptor:
 * - 401 (Unauthorized): redirect ke login
 * - 429 (Rate Limited): retry with exponential backoff
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove(TOKEN_KEY)
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }

    if (error.response?.status === 429) {
      const config = error.config as AxiosRequestConfig & { _retryCount?: number }
      const retryCount = config._retryCount || 0
      if (retryCount < 2) {
        config._retryCount = retryCount + 1
        const delay = 3000 + Math.random() * 2000
        await new Promise((r) => setTimeout(r, delay))
        return apiClient(config)
      }
    }

    return Promise.reject(error)
  }
)

export function getAvatarUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = API_BASE_URL || ''
  const origin = base.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '')
  const path = url.startsWith('/') ? url : `/${url}`
  if (!path.startsWith('/storage/')) return `${origin}/storage${path}`
  return `${origin}${path}`
}

export default apiClient