import type { MetadataRoute } from 'next';
import { seminars } from '@/data/content';
import { getAllBlogPosts } from '@/lib/blog';
import { getAllNotes } from '@/lib/notes';
import { siteUrl } from '@/lib/site';
import { getAllArticles } from '@/lib/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls = getAllArticles().map((article) => ({
    url: `${siteUrl}/writing/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const noteUrls = getAllNotes().map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    lastModified: new Date(`${note.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogUrls = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const talkUrls = seminars.map((seminar) => ({
    url: `${siteUrl}/talks/${seminar.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articleUrls,
    {
      url: `${siteUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...noteUrls,
    {
      url: `${siteUrl}/talks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...talkUrls,
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
