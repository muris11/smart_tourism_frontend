import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/profil/',
          '/login',
          '/register',
        ],
      },
    ],
    sitemap: 'https://smart-tourism-citra.web.id/sitemap.xml',
  }
}
