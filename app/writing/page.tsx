import type { Metadata } from 'next';
import { SectionHeading } from '@/components/section-heading';
import { WritingArchive } from '@/components/writing/writing-archive';
import { copy, profile } from '@/data/content';
import { getAllTags, getArticleSummaries } from '@/lib/writing';

export const metadata: Metadata = {
  title: copy.sectionTitles.writing,
  description: copy.writing.subtitle,
  alternates: { canonical: '/writing' },
  openGraph: {
    type: 'website',
    title: `${copy.sectionTitles.writing} | ${profile.name}`,
    description: copy.writing.subtitle,
    url: '/writing',
  },
};

export default function WritingPage() {
  const articles = getArticleSummaries();
  const tags = getAllTags();

  return (
    <div className="container-page pb-20 pt-32 md:pt-40">
      <SectionHeading
        as="h1"
        title={copy.sectionTitles.writing}
        subtitle={copy.writing.subtitle}
      />
      <WritingArchive articles={articles} tags={tags} />
    </div>
  );
}
