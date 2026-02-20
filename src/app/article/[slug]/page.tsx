import { getPostBySlug, getFeaturedImage, getAuthorName, getCategoryNames, getLatestPosts } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ArticleCard from '@/components/ui/ArticleCard'
import AdSpace from '@/components/ads/AdSpace'
import InArticleAd from '@/components/ads/InArticleAd'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const featuredImage = getFeaturedImage(post)

  return {
    title: `${post.title.rendered} - NewsState24`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
      type: 'article',
      publishedTime: post.date,
      authors: [getAuthorName(post)],
      images: featuredImage ? [{ url: featuredImage }] : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const featuredImage = getFeaturedImage(post)
  const authorName = getAuthorName(post)
  const categories = getCategoryNames(post)
  const relatedPosts = await getLatestPosts(4)

  return (
    <article className="article-page">
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Article Header */}
        <header className="mb-4">
          <div className="mb-2">
            {categories.map((cat, idx) => (
              <CategoryBadge key={idx} name={cat} />
            ))}
          </div>
          
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            lineHeight: 1.2,
            marginBottom: '1rem' 
          }}>
            {post.title.rendered}
          </h1>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            color: 'var(--text-secondary)', 
            fontSize: '0.9rem',
            fontFamily: 'var(--font-sans)',
            marginBottom: '1.5rem'
          }}>
            <span>By <strong>{authorName}</strong></span>
            <span>•</span>
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '500px', 
            marginBottom: '2rem',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        <AdSpace slot="article-top" className="mb-4" />

        {/* Article Content */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <InArticleAd />

        {/* Article Footer */}
        <footer style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border-color)' 
        }}>
          <div className="mb-3">
            <strong>Categories:</strong> {categories.join(', ')}
          </div>
        </footer>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section style={{ background: 'var(--bg-secondary)', padding: '3rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px' }}>
            <h2 className="section-title">Related Articles</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {relatedPosts.map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
