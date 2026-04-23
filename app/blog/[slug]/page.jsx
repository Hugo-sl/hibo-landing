import { client } from '../../../sanity/lib/client'
import { postsQuery, postQuery } from '../../../sanity/lib/queries'
import { urlForImage } from '../../../sanity/lib/image'
import { PortableTextComponent } from '../../components/PortableText'
import Link from 'next/link'

export const runtime = 'edge'

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

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

        {post.mainImage && (
          <div style={{ 
            width: '100%', 
            maxHeight: '500px', 
            borderRadius: '32px', 
            overflow: 'hidden', 
            marginBottom: '3.5rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={urlForImage(post.mainImage).url()} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="blog-content">
          <PortableTextComponent value={post.body} />
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
