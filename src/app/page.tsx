import { getLatestPosts, getFeaturedPosts, getCategories } from '@/lib/wordpress'
import FeaturedArticle from '@/components/ui/FeaturedArticle'
import ArticleCard from '@/components/ui/ArticleCard'
import Sidebar from '@/components/layout/Sidebar'
import BreakingNews from '@/components/ui/BreakingNews'
import AdSpace from '@/components/ads/AdSpace'

export const revalidate = 300 // Revalidate every 5 minutes

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedPosts(3),
    getLatestPosts(12),
    getCategories(),
  ])

  return (
    <div>
      <BreakingNews posts={latest.slice(0, 5)} />
      
      <AdSpace slot="header" className="my-4" />
      
      <div className="container py-4">
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
          </div>
          
          <Sidebar categories={categories} latestPosts={latest.slice(0, 5)} />
        </div>
      </div>
    </div>
  )
}
