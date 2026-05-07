import axios, { AxiosError, AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const TOKEN_KEY = 'st_token'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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

export { apiClient, TOKEN_KEY }
