import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NotesArchive } from '@/components/notes/notes-archive';
import { SectionHeading } from '@/components/section-heading';
import { books, copy } from '@/data/content';
import { NOTE_GROUPS, getNoteSummaries } from '@/lib/notes';

export const metadata: Metadata = {
  title: copy.sectionTitles.notes,
  description: copy.notes.subtitle,
  alternates: { canonical: '/notes' },
  openGraph: {
    type: 'website',
    title: copy.sectionTitles.notes,
    description: copy.notes.subtitle,
    url: '/notes',
  },
};

export default function NotesPage() {
  const notes = getNoteSummaries();

  return (
    <div className="container-page pb-20 pt-32 md:pt-40">
      <SectionHeading
        as="h1"
        title={copy.sectionTitles.notes}
        subtitle={copy.notes.subtitle}
      />

      <h2 className="text-xl font-semibold text-foreground">
        {copy.notes.notesTitle}
      </h2>
      <NotesArchive notes={notes} groups={NOTE_GROUPS} />

      <div className="mt-16">
        <h2 className="text-xl font-semibold text-foreground">
          {copy.notes.booksTitle}
        </h2>
        <p className="mt-2 text-sm text-muted">{copy.notes.booksSubtitle}</p>
        <div className="section-divider !mt-4" />

        {books.length === 0 ? (
          <p className="mt-6 text-sm text-muted">{copy.notes.booksEmpty}</p>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.id}>
                <article className="card flex h-full gap-4 p-5">
                  <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-card border border-line bg-surface-raised">
                    <Image
                      src={book.cover}
                      alt={`${book.title} cover`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug text-foreground">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{book.author}</p>
                    <p className="mt-2 text-xs text-faint">{book.topic}</p>
                    <p className="mt-2 chip">{book.status}</p>
                    {book.noteHref ? (
                      <Link
                        href={book.noteHref}
                        className="mt-3 inline-flex text-xs font-semibold text-accent hover:underline"
                      >
                        {copy.notes.backToNotes}
                      </Link>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
