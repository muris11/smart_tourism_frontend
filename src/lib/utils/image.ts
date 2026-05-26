import { IMAGE_BASE_URL } from '@/config'

export function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  return `${IMAGE_BASE_URL.replace(/\/+$/, '')}/${src.replace(/^\/+/, '')}`
}
