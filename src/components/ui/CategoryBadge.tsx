interface CategoryBadgeProps {
  name: string
}

export default function CategoryBadge({ name }: CategoryBadgeProps) {
  return (
    <span style={{ 
      display: 'inline-block',
      background: 'var(--brand-primary)',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: 'var(--font-sans)'
    }}>
      {name}
    </span>
  )
}
