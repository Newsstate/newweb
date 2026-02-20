import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ 
      background: 'var(--brand-dark)', 
      color: 'white', 
      marginTop: '4rem',
      padding: '3rem 0 1.5rem'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* About */}
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              color: 'var(--brand-primary)'
            }}>
              NEWSSTATE24
            </h3>
            <p style={{ 
              fontSize: '0.9rem', 
              lineHeight: 1.6, 
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font-sans)'
            }}>
              Your trusted source for breaking news, latest updates, and in-depth analysis. 
              Stay informed with NewsState24.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/page/about" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/page/contact" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/page/privacy-policy" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/page/terms" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/category/politics" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Politics
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/category/business" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Business
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/category/technology" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Technology
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/category/sports" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }} aria-label="Facebook">📘</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }} aria-label="Twitter">🐦</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }} aria-label="Instagram">📷</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }} aria-label="YouTube">📺</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.6)'
        }}>
          <p>© {currentYear} NewsState24. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
