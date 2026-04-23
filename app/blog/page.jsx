import { client } from '../../sanity/lib/client'
import { postsQuery } from '../../sanity/lib/queries'
import { urlForImage } from '../../sanity/lib/image'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery)

  return (
    <div className="section" style={{ paddingTop: '8rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="section-container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Le Blog de Hibo
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Tendresse, conseils et sécurité : retrouvez tous nos articles pour mieux vivre au quotidien.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {posts.map((post) => (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="price-glass-col blog-card">
                {post.mainImage && (
                  <div style={{ 
                    width: '100%', 
                    height: '200px', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    marginBottom: '1.5rem',
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }}>
                    <img 
                      src={urlForImage(post.mainImage).url()} 
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
