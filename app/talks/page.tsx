import type { Metadata } from 'next';
import Link from 'next/link';
import { copy, seminars } from '@/data/content';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { TalkCard } from '@/components/talk-card';

export const metadata: Metadata = {
  title: copy.sectionTitles.talks,
  description: copy.talks.intro,
  alternates: { canonical: '/talks' },
  openGraph: {
    type: 'website',
    title: copy.sectionTitles.talks,
    description: copy.talks.intro,
    url: '/talks',
  },
};

export default function TalksPage() {
  return (
    <div className="container-page pb-20 pt-32 md:pt-40">
      <SectionHeading
        as="h1"
        title={copy.sectionTitles.talks}
        subtitle={copy.talks.intro}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seminars.map((seminar, index) => (
          <Reveal key={seminar.slug} delay={index * 50}>
            <TalkCard seminar={seminar} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/#talks" className="btn-secondary">
          {copy.talks.backToTalks}
        </Link>
      </div>
    </div>
  );
}
