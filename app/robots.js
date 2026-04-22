export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Empêcher l'indexation du Studio Sanity
    },
    sitemap: 'https://hibo.app/sitemap.xml',
  }
}
