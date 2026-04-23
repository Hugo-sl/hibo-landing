import { PortableText } from '@portabletext/react'
import { urlForImage } from '../../sanity/lib/image'

// Fonction pour transformer un texte en slug (minuscules, sans accents, sans espaces)
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

const components = {
  types: {
    image: ({ value }) => {
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <img
            src={urlForImage(value).url()}
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
    h2: ({ children }) => {
      const id = slugify(children[0])
      return <h2 id={id} style={{ fontSize: '2rem', marginTop: '2.5rem', marginBottom: '1.2rem', fontWeight: '700', scrollMarginTop: '100px' }}>{children}</h2>
    },
    h3: ({ children }) => {
      const id = slugify(children[0])
      return <h3 id={id} style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700', scrollMarginTop: '100px' }}>{children}</h3>
    },
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

export function PortableTextComponent({ value }) {
  return <PortableText value={value} components={components} />
}
