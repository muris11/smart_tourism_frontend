import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    qualities: [70, 75, 90],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'backend.smart-tourism-citra.web.id' },
      { protocol: 'https', hostname: 'api.smart-tourism-citra.web.id' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  async rewrites() {
    const apiTarget = process.env.API_PROXY_TARGET || 'https://backend.smart-tourism-citra.web.id'
    return [
      {
        source: '/api/:path*',
        destination: `${apiTarget}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
