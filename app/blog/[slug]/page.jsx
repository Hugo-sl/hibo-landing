import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const SANITY_PROJECT_ID = 'zf5gduph'
const SANITY_DATASET = 'production'

function sanityImageUrl(image) {
  if (!image?.asset?._ref) return null
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = sanityImageUrl(value)
      if (!url) return null
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <img
            src={url}
            alt={value.alt || ' '}
            style={{ 
              maxWidth: '100%', 
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          />
          {value.caption && (
            <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 style={{ fontSize: '2.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{children}</h3>,
    normal: ({ children }) => <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>{children}</p>,
    blockquote: ({ children }) => (
      <blockquote style={{ 
        borderLeft: '4px solid var(--primary)', 
        paddingLeft: '1.5rem', 
        fontStyle: 'italic',
        margin: '2rem 0',
        color: '#555' 
      }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{children}</li>,
  },
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  let post = null

  try {
    const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0] { _id, title, "slug": slug.current, publishedAt, mainImage, excerpt, body, category }`)
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-04-21/data/query/${SANITY_DATASET}?query=${query}`
    const res = await fetch(url)
    const data = await res.json()
    post = data.result || null
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error)
  }

  if (!post) {
    return (
      <div className="section" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <h1>Article introuvable</h1>
        <Link href="/blog" style={{ color: 'var(--primary)', marginTop: '2rem', display: 'inline-block' }}>
          Retour au blog
        </Link>
      </div>
    )
  }

  return (
    <article className="section" style={{ paddingTop: '8rem', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div className="section-container" style={{ maxWidth: '800px' }}>
        <Link 
          href="/blog" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-secondary)', 
            textDecoration: 'none',
            marginBottom: '3rem',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          ← Retour au blog
        </Link>

        <div style={{ marginBottom: '1.5rem' }}>
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

        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          lineHeight: '1.1', 
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: '800'
        }}>
          {post.title}
        </h1>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          marginBottom: '3rem',
          color: 'var(--text-secondary)',
          fontSize: '1rem'
        }}>
          <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</span>
        </div>

        {post.mainImage && sanityImageUrl(post.mainImage) && (
          <div style={{ 
            width: '100%', 
            maxHeight: '500px', 
            borderRadius: '32px', 
            overflow: 'hidden', 
            marginBottom: '3.5rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={sanityImageUrl(post.mainImage)} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="blog-content">
          {post.body && <PortableText value={post.body} components={portableTextComponents} />}
        </div>
        
        <div style={{ 
          marginTop: '5rem', 
          padding: '3rem', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Cet article vous a plu ?</h3>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Partagez Hibo avec vos proches pour les rassurer au quotidien.</p>
          <Link href="/" className="btn btn-primary-dark">Découvrir l'application</Link>
        </div>
      </div>
    </article>
  )
}
