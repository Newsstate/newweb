'use client'

import type { WPPost } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedImage, getExcerpt, getCategoryNames } from '@/lib/wordpress'
import { format } from 'date-fns'
import CategoryBadge from './CategoryBadge'
import { useState } from 'react'

interface FeaturedArticleProps {
  post: WPPost
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const featuredImage = getFeaturedImage(post)
  const excerpt = getExcerpt(post, 200)
  const categories = getCategoryNames(post)

  return (
    <article 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        border: '1px solid var(--border-light)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'white',
        transition: 'var(--transition)',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featuredImage && (
        <Link href={`/article/${post.slug}`} style={{ position: 'relative', height: '300px' }}>
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1200px) 100vw, 50vw"
          />
        </Link>
      )}
      
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {categories.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <CategoryBadge name={categories[0]} />
          </div>
        )}
        
        <Link href={`/article/${post.slug}`}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.2,
            color: 'var(--text-primary)'
          }}>
            {post.title.rendered}
          </h2>
        </Link>
        
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)'
        }}>
          {excerpt}
        </p>
        
        <time style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
          {format(new Date(post.date), 'MMMM dd, yyyy')}
        </time>
      </div>
    </article>
  )
}
