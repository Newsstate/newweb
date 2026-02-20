import { getPageBySlug } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: `${page.title.rendered} - NewsState24`,
    description: page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function StaticPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    notFound()
  }

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1rem' }}>
      <article>
        <header className="mb-4">
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '1rem'
          }}>
            {page.title.rendered}
          </h1>
        </header>

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </article>
    </div>
  )
}
