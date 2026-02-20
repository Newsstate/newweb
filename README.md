# NewsState24 - Next.js News Website

Modern, responsive news website built with Next.js 14 and WordPress REST API.

## Features

- 📰 WordPress REST API integration
- 🎨 Modern, professional news design
- 📱 Fully responsive layout
- 🖼️ Featured articles with images
- 🏷️ Category-based navigation
- 📄 Static pages support
- 💰 Ad spaces (header, sidebar, in-article)
- ⚡ Optimized for Vercel deployment
- 🔍 SEO-friendly
- ♿ Accessible UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS with CSS Variables
- **API**: WordPress REST API
- **Deployment**: Vercel
- **Fonts**: Merriweather (serif), Source Sans 3 (sans-serif), Playfair Display (display)

## Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd newsstate24
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your WordPress API URL:

```env
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_NAME=NewsState24
NEXT_PUBLIC_SITE_URL=https://newsstate24.vercel.app
```

### 4. Update WordPress Domain

Edit `next.config.mjs` and replace `your-wordpress-domain.com` with your actual WordPress domain.

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## WordPress Setup

Your WordPress site should:

1. Have REST API enabled (default in WordPress 4.7+)
2. Have categories created
3. Have posts with featured images
4. (Optional) Install a plugin like "Better REST API Featured Images" for better image support

### Required WordPress Endpoints

The app uses these endpoints:
- `/wp-json/wp/v2/posts` - Articles
- `/wp-json/wp/v2/categories` - Categories
- `/wp-json/wp/v2/pages` - Static pages
- `/wp-json/wp/v2/tags` - Tags

## Project Structure

```
newsstate24/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── category/[slug]/   # Category pages
│   │   ├── article/[slug]/    # Article pages
│   │   └── page/[slug]/       # Static pages
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── ui/                # UI components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── FeaturedArticle.tsx
│   │   │   ├── CategoryBadge.tsx
│   │   │   └── ...
│   │   └── ads/               # Ad components
│   │       ├── AdSpace.tsx
│   │       └── AdSense.tsx
│   ├── lib/
│   │   ├── wordpress.ts       # WordPress API client
│   │   └── types.ts           # TypeScript types
│   └── styles/
│       └── globals.css        # Global styles
├── public/
│   ├── ads/                   # Ad placeholder images
│   └── images/                # Static images
├── .env.example
├── next.config.mjs
├── package.json
└── README.md
```

## Deployment to Vercel

### Via GitHub (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - Add `WORDPRESS_API_URL`
   - Add other variables from `.env.example`
6. Click "Deploy"

### Via Vercel CLI

```bash
npm i -g vercel
vercel
```

## Customization

### Colors

Edit CSS variables in `src/styles/globals.css`:

```css
:root {
  --brand-primary: #c41e3a;
  --brand-dark: #1a1a2e;
  --brand-accent: #0f3460;
}
```

### Fonts

Change fonts in `src/styles/globals.css`:

```css
@import url('your-google-fonts-url');

:root {
  --font-serif: 'Your Serif Font', Georgia, serif;
  --font-sans: 'Your Sans Font', sans-serif;
  --font-display: 'Your Display Font', serif;
}
```

### Logo

Replace `NEWSSTATE24` text in `src/components/layout/Header.tsx` with your logo image.

### Ad Spaces

Configure Google AdSense in `.env.local`:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=xxxxxxxxxx
```

## Features Guide

### Homepage Layout

- Breaking news ticker
- Featured articles carousel
- Category sections
- Latest articles grid
- Sidebar with popular posts
- Ad spaces

### Article Page

- Hero image
- Author info
- Publish date
- Category tags
- Social sharing
- Related articles
- Comments (if enabled in WordPress)

### Category Page

- Category title and description
- Articles grid
- Pagination
- Sidebar

## Performance

- Next.js Image Optimization
- Static Generation where possible
- API response caching
- Lazy loading images
- Optimized fonts

## SEO

- Meta tags for all pages
- OpenGraph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap (via Next.js)
- Robots.txt

## Support

For issues or questions, open an issue on GitHub.

## License

MIT
