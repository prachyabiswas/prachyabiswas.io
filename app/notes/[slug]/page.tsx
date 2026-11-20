import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { copy, profile } from '@/data/content';
import { mdxOptions } from '@/lib/mdx';
import {
  formatNoteDate,
  getAllNotes,
  getNoteBySlug,
} from '@/lib/notes';

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.excerpt,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: 'article',
      title: note.title,
      description: note.excerpt,
      url: `/notes/${note.slug}`,
      publishedTime: note.date,
      authors: [profile.name],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <article className="container-page pb-20 pt-32 md:pt-40">
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {copy.notes.backToNotes}
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip border-accent/30 bg-accent/10 text-accent">
            {note.group}
          </span>
          {note.sample ? (
            <span className="chip">{copy.notes.sampleLabel}</span>
          ) : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {note.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {note.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} aria-hidden="true" />
            {formatNoteDate(note.date)}
          </span>
          {note.repo ? (
            <a
              href={note.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
            >
              {copy.notes.viewRepo}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </header>

      <div className="article-body mt-10 max-w-3xl">
        <MDXRemote source={note.content} options={mdxOptions} />
      </div>
    </article>
  );
}
