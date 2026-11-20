import { profile } from '@/data/content';
import { createOgImage } from '@/lib/og-image';
import { siteUrl } from '@/lib/site';

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return createOgImage({
    title: profile.name,
    subtitle: profile.title,
    monogram: profile.shortName,
    domain: siteUrl.replace(/^https?:\/\//, ''),
  });
}
