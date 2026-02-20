import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NewsState24 - Breaking News & Latest Updates',
  description: 'Your trusted source for breaking news, latest updates, and in-depth analysis.',
  keywords: 'news, breaking news, latest news, world news, politics, business, technology',
  openGraph: {
    title: 'NewsState24',
    description: 'Breaking News & Latest Updates',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
