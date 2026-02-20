'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { WPCategory } from '@/lib/types'
import { getCategories } from '@/lib/wordpress'

export default function Header() {
  const [categories, setCategories] = useState<WPCategory[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    getCategories().then(cats => setCategories(cats.slice(0, 6)))
  }, [])

  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
      {/* Top Bar */}
      <div style={{ background: 'var(--brand-dark)', color: 'white', padding: '0.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
            <div>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/page/about" style={{ color: 'white' }}>About</Link>
              <Link href="/page/contact" style={{ color: 'white' }}>Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container" style={{ padding: '1.5rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', 
              fontWeight: 900,
              color: 'var(--brand-primary)',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              NEWSSTATE<span style={{ color: 'var(--brand-dark)' }}>24</span>
            </h1>
          </Link>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ 
        background: 'var(--bg-secondary)', 
        borderTop: '1px solid var(--border-color)',
        borderBottom: '2px solid var(--brand-primary)'
      }}>
        <div className="container">
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none', 
            gap: '2rem', 
            padding: '1rem 0',
            margin: 0,
            flexWrap: 'wrap'
          }}>
            <li>
              <Link href="/" style={{ 
                fontFamily: 'var(--font-sans)', 
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--text-primary)'
              }}>
                Home
              </Link>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <Link href={`/category/${cat.slug}`} style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text-primary)'
                }}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}
