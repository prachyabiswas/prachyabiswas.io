import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  NOTE_GROUPS,
  type Note,
  type NoteGroup,
} from './notes-shared';

export type { Note, NoteSummary } from './notes-shared';
export { formatNoteDate, NOTE_GROUPS } from './notes-shared';

const NOTES_DIR = path.join(process.cwd(), 'content', 'notes');

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asGroup(value: unknown): NoteGroup {
  return NOTE_GROUPS.includes(value as NoteGroup)
    ? (value as NoteGroup)
    : 'Machine Learning';
}

/** Reads every MDX file in content/notes and returns newest-first notes. */
export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), 'utf8');
      const { data, content } = matter(raw);

      return {
        title: asString(data.title, file.replace(/\.mdx$/, '')),
        slug: asString(data.slug, file.replace(/\.mdx$/, '')),
        group: asGroup(data.group),
        date: asString(data.date),
        excerpt: asString(data.excerpt),
        repo: asString(data.repo) || undefined,
        sample: data.sample === true,
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoteSummaries() {
  return getAllNotes().map(({ content: _content, ...summary }) => summary);
}

export function getNoteBySlug(slug: string): Note | undefined {
  return getAllNotes().find((note) => note.slug === slug);
}
