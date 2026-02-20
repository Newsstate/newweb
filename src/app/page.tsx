import { getLatestPosts, getFeaturedPosts, getCategories } from '@/lib/wordpress'
import FeaturedArticle from '@/components/ui/FeaturedArticle'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/layout/Sidebar'
import BreakingNews from '@/components/ui/BreakingNews'
import AdSpace from '@/components/ads/AdSpace'

export const revalidate = 300 // Revalidate every 5 minutes

export default async function HomePage() {
  // Fetch data with error handling
  let featured = []
  let latest = []
  let categories = []

  try {
    [featured, latest, categories] = await Promise.all([
      getFeaturedPosts(3),
      getLatestPosts(12),
      getCategories(),
    ])
  } catch (error) {
    console.error('Error fetching WordPress data:', error)
  }

  // Ensure arrays are always arrays
  featured = Array.isArray(featured) ? featured : []
  latest = Array.isArray(latest) ? latest : []
  categories = Array.isArray(categories) ? categories : []

  return (
    <div>
      {latest.length > 0 && <BreakingNews posts={latest.slice(0, 5)} />}
      
      <AdSpace slot="header" className="my-4" />
      
      <div className="container py-4">
        {latest.length === 0 && categories.length === 0 && (
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            margin: '2rem 0'
          }}>
            <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Welcome to NewsState24
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Configure your WordPress REST API URL in environment variables to display content.
            </p>
            <code style={{
              background: 'var(--bg-primary)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              WORDPRESS_API_URL=https://lalluram.com/wp-json/wp/v2
            </code>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
          <div>
            {/* Featured Articles */}
            {featured.length > 0 && (
              <section className="mb-4">
                <h2 className="section-title">Featured Stories</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {featured.map(post => (
                    <FeaturedArticle key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Articles Grid */}
            {latest.length > 0 && (
              <section className="mb-4">
                <h2 className="section-title">Latest News</h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  {latest.map(post => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {(categories.length > 0 || latest.length > 0) && (
            <Sidebar categories={categories} latestPosts={latest.slice(0, 5)} />
          )}
        </div>
      </div>
    </div>
  )
}
