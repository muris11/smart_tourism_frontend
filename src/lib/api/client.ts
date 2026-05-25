import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

/** Key untuk menyimpan token di cookies */
export const TOKEN_KEY = 'st_token'

/** Base URL dari environment variable */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

/** Axios instance untuk API calls */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
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
 * Response interceptor: handle error 401 (Unauthorized)
 * Redirect ke halaman login dan hapus token
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove(TOKEN_KEY)
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient