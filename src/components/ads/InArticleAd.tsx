export default function InArticleAd() {
  return (
    <div style={{ 
      margin: '3rem 0',
      padding: '2rem',
      background: 'var(--bg-secondary)',
      border: '1px dashed var(--border-color)',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        📢 Advertisement
      </div>
      <div style={{ 
        background: 'white',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        color: 'var(--text-light)'
      }}>
        In-Article Ad Space (300x250)
      </div>
    </div>
  )
}
