import type { Metadata } from 'next';
import { BlogArchive } from '@/components/blog/blog-archive';
import { SectionHeading } from '@/components/section-heading';
import { copy } from '@/data/content';
import { BLOG_CATEGORIES, getBlogPostSummaries } from '@/lib/blog';

export const metadata: Metadata = {
  title: copy.sectionTitles.blog,
  description: copy.blog.subtitle,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: copy.sectionTitles.blog,
    description: copy.blog.subtitle,
    url: '/blog',
  },
};

export default function BlogPage() {
  const posts = getBlogPostSummaries();

  return (
    <div className="container-page pb-20 pt-32 md:pt-40">
      <SectionHeading
        as="h1"
        title={copy.sectionTitles.blog}
        subtitle={copy.blog.subtitle}
      />
      <BlogArchive posts={posts} categories={BLOG_CATEGORIES} />
    </div>
  );
}
