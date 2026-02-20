'use client'

import type { WPPost } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedImage, getExcerpt, getCategoryNames } from '@/lib/wordpress'
import { format } from 'date-fns'
import CategoryBadge from './CategoryBadge'
import { useState } from 'react'

interface ArticleCardProps {
  post: WPPost
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const featuredImage = getFeaturedImage(post)
  const excerpt = getExcerpt(post, 120)
  const categories = getCategoryNames(post)

  return (
    <article 
      style={{ 
        border: '1px solid var(--border-light)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'var(--transition)',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'none',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featuredImage && (
        <Link href={`/article/${post.slug}`} style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {categories.length > 0 && (
          <div style={{ marginBottom: '0.75rem' }}>
            <CategoryBadge name={categories[0]} />
          </div>
        )}
        
        <Link href={`/article/${post.slug}`}>
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            lineHeight: 1.3,
            color: 'var(--text-primary)'
          }}>
            {post.title.rendered}
          </h3>
        </Link>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-sans)',
          flex: 1
        }}>
          {excerpt}
        </p>
        
        <time style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
          {format(new Date(post.date), 'MMMM dd, yyyy')}
        </time>
      </div>
    </article>
  )
}
