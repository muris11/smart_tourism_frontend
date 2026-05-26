export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.smart-tourism-citra.web.id'
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || API_BASE_URL

export const getImageUrl = (src: string): string => {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  return `${IMAGE_BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`
}
