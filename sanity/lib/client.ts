import { createClient } from 'next-sanity'

export const projectId = 'zf5gduph'
export const dataset = 'production'
export const apiVersion = '2024-04-21'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // On désactive le CDN pour obtenir les données les plus récentes par défaut (idéal pour le développement)
})
