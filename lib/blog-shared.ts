/** Browser-safe blog types and helpers (no Node.js filesystem imports). */

export type BlogCategory =
  | 'University'
  | 'Olympiad'
  | 'Competitions'
  | 'Teaching'
  | 'Other';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'University',
  'Olympiad',
  'Competitions',
  'Teaching',
  'Other',
];

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  coverImage?: string;
  gallery: string[];
  sample: boolean;
  content: string;
}

export type BlogPostSummary = Omit<BlogPost, 'content'>;

export function formatBlogDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatBlogMonth(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}
