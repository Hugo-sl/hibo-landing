import { client } from '../../../../sanity/lib/client'
import Link from 'next/link'

// Fonction slugify pour harmoniser les URLs
function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post" && defined(category)]{ "category": category }`)
  const categories = [...new Set(posts.map(p => slugify(p.category || '')).filter(Boolean))]
  return categories.map(cat => ({ cat }))
}

function sanityImageUrl(image) {
  if (!image?.asset?._ref) return null
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/zf5gduph/production/${id}-${dimensions}.${format}`
}

export default async function CategoryPage({ params }) {
  const { cat } = await params
  
  // On récupère tous les posts et on filtre en JS pour matcher le slugify
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { _id, title, "slug": slug.current, publishedAt, mainImage, excerpt, category }`
  )
  
  const filteredPosts = posts.filter(p => slugify(p.category || '') === cat)

  return (
    <div className="section" style={{ paddingTop: '8rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="section-container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Catégorie : <span style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{cat.replace(/-/g, ' ')}</span>
          </h1>
          <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: '600' }}>← Voir tous les articles</Link>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {filteredPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    <img src={sanityImageUrl(post.mainImage)} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.2' }}>{post.title}</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{post.excerpt}</p>
                <div style={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.4)', fontWeight: '600' }}>
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
