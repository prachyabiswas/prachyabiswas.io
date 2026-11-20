import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogPost,
} from './blog-shared';

export type { BlogCategory, BlogPost, BlogPostSummary } from './blog-shared';
export {
  BLOG_CATEGORIES,
  formatBlogDate,
  formatBlogMonth,
} from './blog-shared';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function asCategory(value: unknown): BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory)
    ? (value as BlogCategory)
    : 'Other';
}

/** Reads every MDX file in content/blog and returns newest-first posts. */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);

      return {
        title: asString(data.title, file.replace(/\.mdx$/, '')),
        slug: asString(data.slug, file.replace(/\.mdx$/, '')),
        date: asString(data.date),
        category: asCategory(data.category),
        excerpt: asString(data.excerpt),
        coverImage: asString(data.coverImage) || undefined,
        gallery: asStringArray(data.gallery),
        sample: data.sample === true,
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostSummaries() {
  return getAllBlogPosts().map(({ content: _content, ...summary }) => summary);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
