'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  slot: string
  format?: string
  responsive?: boolean
}

export default function AdSense({ slot, format = 'auto', responsive = true }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  if (!client) {
    return <div style={{ padding: '2rem', textAlign: 'center', background: '#f5f5f5' }}>
      Ad space (Configure NEXT_PUBLIC_ADSENSE_CLIENT)
    </div>
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  )
}
