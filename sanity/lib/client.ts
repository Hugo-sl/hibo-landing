import { createClient } from 'next-sanity'

export const projectId = 'zf5gduph'
export const dataset = 'production'
export const apiVersion = '2024-04-21'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Activé pour de meilleures performances et compatibilité Edge
})
