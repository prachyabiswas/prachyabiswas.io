'use client';

import { ArrowUpRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { copy } from '@/data/content';
import {
  formatNoteDate,
  type NoteGroup,
  type NoteSummary,
} from '@/lib/notes-shared';

export function NotesArchive({
  notes,
  groups,
}: {
  notes: NoteSummary[];
  groups: NoteGroup[];
}) {
  const [activeGroup, setActiveGroup] = useState<NoteGroup | ''>('');

  const filtered = useMemo(
    () =>
      activeGroup
        ? notes.filter((note) => note.group === activeGroup)
        : notes,
    [notes, activeGroup],
  );

  return (
    <>
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label={copy.a11y.filterByGroup}
      >
        <button
          type="button"
          onClick={() => setActiveGroup('')}
          aria-pressed={activeGroup === ''}
          className={`chip transition ${
            activeGroup === ''
              ? 'border-accent bg-accent/10 text-accent'
              : 'hover:border-accent hover:text-accent'
          }`}
        >
          {copy.notes.allGroups}
        </button>
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setActiveGroup(group)}
            aria-pressed={activeGroup === group}
            className={`chip transition ${
              activeGroup === group
                ? 'border-accent bg-accent/10 text-accent'
                : 'hover:border-accent hover:text-accent'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted">{copy.notes.noNotes}</p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <li key={note.slug}>
              <article className="card flex h-full flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip border-accent/30 bg-accent/10 text-accent">
                    {note.group}
                  </span>
                  {note.sample ? (
                    <span className="chip">{copy.notes.sampleLabel}</span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="transition hover:text-accent"
                  >
                    {note.title}
                  </Link>
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {note.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <CalendarDays size={13} aria-hidden="true" />
                    {formatNoteDate(note.date)}
                  </span>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    {copy.labels.readMore}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
