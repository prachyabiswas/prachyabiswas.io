import Image from 'next/image';
import Link from 'next/link';
import type { Seminar } from '@/data/content';
import { Icon } from './icons';

export function TalkCard({ seminar }: { seminar: Seminar }) {
  const photo = seminar.photos.find((item) => !item.startsWith('['));

  return (
    <Link
      href={`/talks/${seminar.slug}`}
      className="card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-accent"
    >
      {photo ? (
        <div className="relative aspect-[16/9] border-b border-line bg-surface-raised">
          <Image
            src={photo}
            alt={`${seminar.title} photo`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center border-b border-line bg-surface-raised text-faint">
          <Icon name="mic" className="h-8 w-8" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {seminar.host}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
          {seminar.title}
        </h3>
        {!seminar.date.startsWith('[') ? (
          <p className="mt-2 flex items-center gap-2 text-xs text-faint">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {seminar.date}
          </p>
        ) : null}
        {!seminar.summary.startsWith('[') ? (
          <p className="mt-3 text-sm leading-6 text-muted">{seminar.summary}</p>
        ) : null}
      </div>
    </Link>
  );
}
