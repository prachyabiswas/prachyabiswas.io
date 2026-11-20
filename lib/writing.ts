import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Article, ArticleLanguage } from './writing-shared';

export type { ArticleLanguage, Article, ArticleSummary } from './writing-shared';
export { formatArticleDate } from './writing-shared';

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing');

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Reads every MDX file in content/writing and returns newest-first articles. */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(WRITING_DIR)) return [];

  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(WRITING_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const language = asString(data.language, 'en');

      return {
        title: asString(data.title, file.replace(/\.mdx$/, '')),
        slug: asString(data.slug, file.replace(/\.mdx$/, '')),
        date: asString(data.date),
        excerpt: asString(data.excerpt),
        tags: asTags(data.tags),
        featured: data.featured === true,
        sample: data.sample === true,
        language: (language === 'bn' ? 'bn' : 'en') as ArticleLanguage,
        coverImage: asString(data.coverImage) || undefined,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleSummaries() {
  return getAllArticles().map(({ content: _content, ...summary }) => summary);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getFeaturedArticle(): Article | undefined {
  const articles = getAllArticles();
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getAllTags(): string[] {
  const tags = new Set(getAllArticles().flatMap((article) => article.tags));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
