import { getCategoryBySlug, getPostsByCategory } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/layout/Sidebar'
import AdSpace from '@/components/ads/AdSpace'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - NewsState24`,
    description: category.description || `Latest ${category.name} news and updates`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    notFound()
  }

  let posts = []
  try {
    posts = await getPostsByCategory(category.id, { per_page: 20 })
    posts = Array.isArray(posts) ? posts : []
  } catch (error) {
    console.error('Error fetching category posts:', error)
  }

  return (
    <div>
      <AdSpace slot="header" className="my-4" />
      
      <div className="container py-4">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
          <div>
            {/* Category Header */}
            <header className="mb-4">
              <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
                {category.name}
              </h1>
              {category.description && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                  {category.description}
                </p>
              )}
            </header>

            {/* Articles Grid */}
            {posts.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {posts.map(post => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div style={{ 
                padding: '3rem', 
                textAlign: 'center', 
                background: 'var(--bg-secondary)',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                  No articles found in this category yet.
                </p>
              </div>
            )}
          </div>
          
          <Sidebar categories={[]} latestPosts={posts.slice(0, 5)} />
        </div>
      </div>
    </div>
  )
}
