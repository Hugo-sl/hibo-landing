import { client } from '../sanity/lib/client'
import { postsQuery } from '../sanity/lib/queries'

export default async function sitemap() {
  const baseUrl = 'https://hibo.app' // À adapter avec le domaine final

  // Récupération des articles pour le sitemap dynamique
  const posts = await client.fetch(postsQuery)
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ]
}
