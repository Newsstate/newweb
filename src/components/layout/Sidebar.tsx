import type { WPPost, WPCategory } from '@/lib/types'
import Link from 'next/link'
import { getFeaturedImage, getExcerpt } from '@/lib/wordpress'
import { format } from 'date-fns'
import AdSpace from '../ads/AdSpace'

interface SidebarProps {
  categories: WPCategory[]
  latestPosts: WPPost[]
}

export default function Sidebar({ categories, latestPosts }: SidebarProps) {
  return (
    <aside style={{ position: 'sticky', top: '2rem' }}>
      {/* Ad Space */}
      <AdSpace slot="sidebar" className="mb-4" />

      {/* Popular Posts */}
      {latestPosts.length > 0 && (
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.25rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--brand-primary)'
          }}>
            Popular Posts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {latestPosts.map((post, idx) => (
              <Link 
                key={post.id} 
                href={`/article/${post.slug}`}
                style={{ 
                  display: 'flex', 
                  gap: '0.75rem',
                  paddingBottom: '1rem',
                  borderBottom: idx < latestPosts.length - 1 ? '1px solid var(--border-light)' : 'none'
                }}
              >
                <span style={{ 
                  fontSize: '2rem', 
                  fontWeight: 900, 
                  color: 'var(--brand-primary)',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1
                }}>
                  {idx + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '0.9rem', 
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3,
                    fontWeight: 700
                  }}>
                    {post.title.rendered}
                  </h4>
                  <time style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '1.5rem', 
          borderRadius: '8px'
        }}>
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.25rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--brand-primary)'
          }}>
            Categories
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map(cat => (
              <li key={cat.id} style={{ marginBottom: '0.75rem' }}>
                <Link 
                  href={`/category/${cat.slug}`}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    {cat.name}
                  </span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'white',
                    background: 'var(--brand-primary)',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '12px'
                  }}>
                    {cat.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
