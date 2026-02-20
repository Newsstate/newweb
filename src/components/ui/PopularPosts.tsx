import type { WPPost } from '@/lib/types'
import Link from 'next/link'
import { format } from 'date-fns'

interface PopularPostsProps {
  posts: WPPost[]
}

export default function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <div>
      <h3 className="section-title">Popular Posts</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post, idx) => (
          <Link 
            key={post.id}
            href={`/article/${post.slug}`}
            style={{ 
              display: 'flex',
              gap: '1rem',
              paddingBottom: '1rem',
              borderBottom: idx < posts.length - 1 ? '1px solid var(--border-light)' : 'none'
            }}
          >
            <span style={{ 
              fontSize: '2rem', 
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              color: 'var(--brand-primary)',
              lineHeight: 1
            }}>
              {idx + 1}
            </span>
            <div>
              <h4 style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '0.25rem',
                lineHeight: 1.3
              }}>
                {post.title.rendered}
              </h4>
              <time style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
