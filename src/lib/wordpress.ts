// WordPress REST API Client
import axios from 'axios';
import type { WPPost, WPCategory, WPPage, WPAPIParams, WPTag } from './types';

const API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

if (!API_URL) {
  console.warn('WordPress API URL not configured');
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── POSTS ──────────────────────────────────────────────────────────────────

export async function getPosts(params: WPAPIParams = {}): Promise<WPPost[]> {
  const defaultParams: WPAPIParams = {
    per_page: 10,
    _embed: true,
    ...params,
  };
  
  try {
    const response = await api.get<WPPost[]>('/posts', { params: defaultParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const response = await api.get<WPPost[]>('/posts', {
      params: { slug, _embed: true },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

export async function getPostsByCategory(categoryId: number, params: WPAPIParams = {}): Promise<WPPost[]> {
  return getPosts({
    categories: categoryId.toString(),
    ...params,
  });
}

export async function getLatestPosts(limit = 10): Promise<WPPost[]> {
  return getPosts({
    per_page: limit,
    orderby: 'date',
    order: 'desc',
  });
}

export async function getFeaturedPosts(limit = 5): Promise<WPPost[]> {
  // Assuming you have a 'featured' tag or category in WordPress
  // Adjust this based on your WordPress setup
  return getPosts({
    per_page: limit,
    orderby: 'date',
    order: 'desc',
  });
}

export async function searchPosts(query: string, limit = 10): Promise<WPPost[]> {
  return getPosts({
    search: query,
    per_page: limit,
  });
}

// ─── CATEGORIES ─────────────────────────────────────────────────────────────

export async function getCategories(): Promise<WPCategory[]> {
  try {
    const response = await api.get<WPCategory[]>('/categories', {
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  try {
    const response = await api.get<WPCategory[]>('/categories', {
      params: { slug },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

// ─── PAGES ──────────────────────────────────────────────────────────────────

export async function getPages(): Promise<WPPage[]> {
  try {
    const response = await api.get<WPPage[]>('/pages', {
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const response = await api.get<WPPage[]>('/pages', {
      params: { slug, _embed: true },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

// ─── TAGS ───────────────────────────────────────────────────────────────────

export async function getTags(): Promise<WPTag[]> {
  try {
    const response = await api.get<WPTag[]>('/tags', {
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

export function getFeaturedImage(post: WPPost): string | null {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

export function getAuthorName(post: WPPost): string {
  if (post._embedded && post._embedded.author && post._embedded.author[0]) {
    return post._embedded.author[0].name;
  }
  return 'Unknown Author';
}

export function getCategoryNames(post: WPPost): string[] {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
    return post._embedded['wp:term'][0].map((term) => term.name);
  }
  return [];
}

export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function getExcerpt(post: WPPost, length = 150): string {
  const text = stripHTML(post.excerpt.rendered);
  return text.length > length ? text.substring(0, length) + '...' : text;
}
