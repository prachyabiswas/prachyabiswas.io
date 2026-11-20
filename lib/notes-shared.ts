/** Browser-safe note types and helpers (no Node.js filesystem imports). */

export type NoteGroup = 'Machine Learning' | 'AI' | 'Mathematics';

export const NOTE_GROUPS: NoteGroup[] = [
  'Machine Learning',
  'AI',
  'Mathematics',
];

export interface Note {
  title: string;
  slug: string;
  group: NoteGroup;
  date: string;
  excerpt: string;
  repo?: string;
  sample: boolean;
  content: string;
}

export type NoteSummary = Omit<Note, 'content'>;

export function formatNoteDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
