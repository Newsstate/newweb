/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-wordpress-domain.com', // Replace with your WordPress domain
      'via.placeholder.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2',
  },
};

export default nextConfig;
