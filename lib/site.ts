import { profile } from '@/data/content';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prachyabiswas.com'
).replace(/\/+$/, '');

export const siteName = profile.name;

export const siteDescription = profile.metaDescription;
