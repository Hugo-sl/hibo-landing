import { client } from '../../sanity/lib/client'
import { postsQuery } from '../../sanity/lib/queries'
import { urlForImage } from '../../sanity/lib/image'
import Link from 'next/link'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  return (
    <div className="section" style={{ paddingTop: '8rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="section-container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Le Blog de Hibo
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Tests statique pour débogage.
          </p>
        </div>
        <div className="text-center">
            <h2>Mode maintenance temporaire</h2>
            <Link href="/">Retour à l'accueil</Link>
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
