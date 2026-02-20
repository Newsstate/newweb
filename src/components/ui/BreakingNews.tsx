'use client'

import type { WPPost } from '@/lib/types'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface BreakingNewsProps {
  posts: WPPost[]
}

export default function BreakingNews({ posts }: BreakingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (posts.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [posts.length])

  if (posts.length === 0) return null

  return (
    <div style={{ 
      background: 'var(--brand-primary)', 
      color: 'white',
      padding: '0.75rem 0'
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 900,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            flexShrink: 0
          }}>
            ⚡ Breaking
          </span>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Link 
              href={`/article/${posts[currentIndex].slug}`}
              style={{ 
                color: 'white',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {posts[currentIndex].title.rendered}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
