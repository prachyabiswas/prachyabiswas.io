import { profile } from '@/data/content';
import { createOgImage } from '@/lib/og-image';
import { siteUrl } from '@/lib/site';
import { getArticleBySlug } from '@/lib/writing';

export const alt = 'Writing cover image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ArticleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const subtitle = article?.excerpt ?? profile.title;

  return createOgImage({
    title: article?.title ?? profile.name,
    subtitle: subtitle.length > 90 ? `${subtitle.slice(0, 87)}...` : subtitle,
    monogram: profile.shortName,
    domain: siteUrl.replace(/^https?:\/\//, ''),
  });
}
