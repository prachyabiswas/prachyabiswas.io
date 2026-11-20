'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { copy } from '@/data/content';

export function TalkGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  if (!photos.length) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {photos.map((photo) => (
          <button
            key={photo}
            type="button"
            onClick={() => setActive(photo)}
            className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface-raised"
          >
            <Image
              src={photo}
              alt={`${title} photo`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl rounded-card border border-line bg-surface p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-raised text-foreground transition hover:border-accent hover:text-accent"
              aria-label={copy.achievements.close}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="flex max-h-[80vh] items-center justify-center overflow-auto rounded-lg bg-background">
              <Image
                src={active}
                alt={`${title} photo`}
                width={1400}
                height={1000}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
