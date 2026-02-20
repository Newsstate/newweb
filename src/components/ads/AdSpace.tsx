interface AdSpaceProps {
  slot: 'header' | 'sidebar' | 'article-top' | 'footer'
  className?: string
}

export default function AdSpace({ slot, className = '' }: AdSpaceProps) {
  const dimensions = {
    header: { width: '728px', height: '90px' },
    sidebar: { width: '300px', height: '250px' },
    'article-top': { width: '728px', height: '90px' },
    footer: { width: '728px', height: '90px' },
  }

  const size = dimensions[slot]

  return (
    <div 
      className={`ad-space ${className}`}
      style={{ 
        background: 'var(--bg-secondary)',
        border: '1px dashed var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        borderRadius: '4px',
        maxWidth: size.width,
        height: size.height,
        margin: '0 auto'
      }}
    >
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>📢</div>
        <div>Advertisement</div>
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
          {size.width} x {size.height}
        </div>
      </div>
    </div>
  )
}
