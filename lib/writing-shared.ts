/** Browser-safe article types and helpers (no Node.js filesystem imports). */

export type ArticleLanguage = 'en' | 'bn';

export interface Article {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  sample: boolean;
  language: ArticleLanguage;
  coverImage?: string;
  content: string;
  readingTime: number;
}

export type ArticleSummary = Omit<Article, 'content'>;

export function formatArticleDate(
  date: string,
  language: ArticleLanguage = 'en',
): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
