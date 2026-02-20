# Deployment Guide - NewsState24

## Quick Deploy to Vercel via GitHub

### Step 1: Prepare Your Repository

```bash
# Initialize git if not done
git init

# Add all files
git add .

# Commit
git commit -m "Initial NewsState24 setup"

# Create main branch
git branch -M main
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name it: `newsstate24`
4. Don't initialize with README (we already have one)
5. Click "Create Repository"

### Step 3: Push to GitHub

```bash
# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR-USERNAME/newsstate24.git

# Push code
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `newsstate24` repository
5. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 5: Add Environment Variables

In Vercel project settings, add:

```
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_NAME=NewsState24
NEXT_PUBLIC_SITE_URL=https://newsstate24.vercel.app
```

### Step 6: Deploy

Click **Deploy** and wait ~2 minutes.

Your site will be live at: `https://newsstate24.vercel.app`

## Custom Domain Setup

### On Vercel:

1. Go to Project Settings → Domains
2. Add your domain: `newsstate24.com`
3. Follow DNS configuration instructions

### DNS Configuration (Example for Cloudflare/Namecheap):

Add these records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Continuous Deployment

Every push to `main` branch will auto-deploy to Vercel.

### Feature Branch Preview

```bash
# Create feature branch
git checkout -b feature/new-layout

# Make changes, commit
git add .
git commit -m "Update layout"

# Push to GitHub
git push origin feature/new-layout
```

Vercel will create a preview URL for this branch automatically.

## Environment-Specific Builds

### Production
- Branch: `main`
- URL: `newsstate24.vercel.app` or your custom domain

### Staging (Optional)
1. Create `staging` branch
2. In Vercel, assign `staging` branch to production environment

## WordPress Configuration

### Enable CORS (if needed)

Add to WordPress `functions.php`:

```php
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}
add_action('init','add_cors_http_header');
```

### Optimize WordPress REST API

Install plugins:
- **Better REST API Featured Images** - Better image support
- **WP REST API Cache** - Faster API responses
- **Yoast SEO** - Better SEO data in API

## Monitoring

### Vercel Analytics

Enable in project settings for:
- Page views
- Performance metrics
- Error tracking

### Google Analytics

Add to `.env`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Performance Optimization

### Vercel Edge Functions

Already configured in `next.config.mjs` for:
- Image optimization
- API caching
- Static generation

### Recommended Settings

In Vercel project settings:
- **Node.js Version**: 20.x
- **Region**: Choose closest to your WordPress server
- **Build & Output Settings**: Default

## Troubleshooting

### Build Fails

Check:
- All environment variables are set
- WordPress API is accessible
- No TypeScript errors

### Images Not Loading

1. Check `next.config.mjs` has correct WordPress domain
2. Verify WordPress images are public
3. Check CORS settings

### API Timeout

Increase timeout in `src/lib/wordpress.ts`:
```typescript
timeout: 15000  // Increase from 10000
```

## Rollback Deployment

In Vercel:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Useful Commands

```bash
# Local development
npm run dev

# Build locally (test before deploy)
npm run build

# Start production build locally
npm run start

# Lint code
npm run lint

# Deploy to Vercel (if using Vercel CLI)
vercel

# Deploy to production directly
vercel --prod
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **WordPress REST API**: https://developer.wordpress.org/rest-api/

---

Your NewsState24 site is now live! 🎉
