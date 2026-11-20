'use client';

import { useState } from 'react';
import { copy, type AchievementRow } from '@/data/content';
import { CertificateLightbox } from './certificate-lightbox';
import { Icon } from './icons';

export function CertificateAccordion({ rows }: { rows: AchievementRow[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="certificate-entries"
        className="inline-flex items-center gap-2 text-base font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-foreground"
      >
        <Icon
          name="arrowRight"
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? 'rotate-90' : ''
          }`}
        />
        {copy.achievements.certificates}
      </button>

      {open ? (
        <div
          id="certificate-entries"
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rows.map((row) => (
            <article key={row.id} className="card flex h-full flex-col p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-raised text-accent">
                <Icon name={row.icon} className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-base font-semibold leading-snug text-foreground">
                {row.title}
              </h4>
              {row.year.trim() && !row.year.trim().startsWith('[') ? (
                <p className="mt-1 text-sm font-medium text-accent">{row.year}</p>
              ) : null}
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {row.detail}
              </p>
              {row.certificatePath ? (
                <CertificateLightbox
                  src={row.certificatePath}
                  alt={row.certificateAlt ?? row.title}
                />
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
