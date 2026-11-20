import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { copy, seminars } from '@/data/content';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/reveal';
import { TalkGallery } from '@/components/talk-gallery';

interface TalkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return seminars.map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({
  params,
}: TalkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const seminar = seminars.find((item) => item.slug === slug);
  if (!seminar) return { title: copy.sectionTitles.talks };

  return {
    title: `${seminar.title} | ${copy.sectionTitles.talks}`,
    description:
      seminar.summary && !seminar.summary.startsWith('[')
        ? seminar.summary
        : `${seminar.title} — ${seminar.host}`,
    alternates: { canonical: `/talks/${seminar.slug}` },
  };
}

export default async function TalkDetailPage({ params }: TalkPageProps) {
  const { slug } = await params;
  const seminar = seminars.find((item) => item.slug === slug);
  if (!seminar) notFound();

  const details = seminar.details.trim();
  const topics = seminar.topics.filter((topic) => !topic.startsWith('['));
  const links = seminar.links.filter((link) => link.href?.trim());
  const photos = seminar.photos.filter((photo) => !photo.startsWith('['));

  return (
    <article className="container-page pb-20 pt-32 md:pt-40">
      <Reveal>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <Icon name="mic" className="h-3.5 w-3.5" />
          {copy.sectionTitles.talks}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {seminar.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <span>{seminar.host}</span>
          {!seminar.date.startsWith('[') ? <span>{seminar.date}</span> : null}
        </div>
      </Reveal>

      {photos.length ? (
        <Reveal className="mt-10">
          <TalkGallery photos={photos} title={seminar.title} />
        </Reveal>
      ) : null}

      {details && !details.startsWith('[') ? (
        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">
            {copy.talks.aboutSession}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-muted">
            {details}
          </p>
        </Reveal>
      ) : null}

      {topics.length ? (
        <Reveal className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">
            {copy.talks.topicsCovered}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <li key={topic} className="chip">
                {topic}
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {links.length ? (
        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Icon name="externalLink" className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      <div className="mt-14">
        <Link href="/talks" className="btn-secondary">
          {copy.talks.backToTalks}
        </Link>
      </div>
    </article>
  );
}
