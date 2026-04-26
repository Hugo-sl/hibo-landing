'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const runtime = 'edge'
export const revalidate = 60

const SANITY_PROJECT_ID = 'zf5gduph'
const SANITY_DATASET = 'production'

function sanityImageUrl(image) {
  if (!image?.asset?._ref) return null
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`
}

function BlogContent() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const categorie = searchParams.get('categorie')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) { _id, title, "slug": slug.current, publishedAt, mainImage, excerpt, category }`)
        const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-04-21/data/query/${SANITY_DATASET}?query=${query}`
        const res = await fetch(url)
        const data = await res.json()
        setPosts(data.result || [])
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = categorie 
    ? posts.filter(p => p.category?.toLowerCase() === categorie.toLowerCase())
    : posts

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div className="loader" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Chargement des articles...</div>
      </div>
    )
  }

  return (
    <>
      <div className="text-center" style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          Le Blog de Hibo
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', marginBottom: '2rem' }}>
          Tendresse, conseils et sécurité : retrouvez tous nos articles pour mieux vivre au quotidien.
        </p>

        {categorie && (
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
              Catégorie : <strong style={{ textTransform: 'capitalize' }}>{categorie}</strong>
            </span>
            <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
              Voir tous les articles
            </Link>
          </div>
        )}
      </div>

      {!filteredPosts || filteredPosts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✍️</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Aucun article trouvé
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            {categorie ? `Il n'y a pas encore d'articles dans la catégorie "${categorie}".` : "Nous préparons de nouveaux contenus pour vous."}
          </p>
          <Link href="/blog" className="btn btn-primary-dark">
            Voir tous les articles
          </Link>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {filteredPosts.map((post) => (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="price-glass-col blog-card">
                {post.mainImage && sanityImageUrl(post.mainImage) && (
                  <div style={{ 
                    width: '100%', 
                    height: '200px', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    marginBottom: '1.5rem',
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }}>
                    <img 
                      src={sanityImageUrl(post.mainImage)} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px', 
                    color: 'var(--primary)',
                    background: 'rgba(255, 159, 102, 0.1)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '100px'
                  }}>
                    {post.category || 'Général'}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.2' }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.4)', fontWeight: '600' }}>
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default function BlogPage() {
  return (
    <div className="section" style={{ paddingTop: '8rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="section-container">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem 0' }}>Chargement...</div>}>
          <BlogContent />
        </Suspense>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .price-glass-col.blog-card {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(25px) saturate(200%) !important;
          -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
          border: 1px solid rgba(255, 255, 255, 0.45) !important;
          padding: 2rem !important;
          border-radius: 24px !important;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
          transition: all 0.3s ease !important;
          height: 100%;
        }
        .price-glass-col.blog-card:hover {
          transform: translateY(-10px) !important;
          background: rgba(255, 255, 255, 0.6) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
        }
      `}} />
    </div>
  )
}
