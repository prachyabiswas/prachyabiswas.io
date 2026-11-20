'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { copy } from '@/data/content';
import { Icon } from './icons';

interface CertificateLightboxProps {
  src: string;
  alt: string;
}

export function CertificateLightbox({ src, alt }: CertificateLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:underline"
      >
        <Icon name="externalLink" className="h-3.5 w-3.5" />
        {copy.achievements.viewCertificate}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl rounded-card border border-line bg-surface p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-raised text-foreground transition hover:border-accent hover:text-accent"
              aria-label={copy.achievements.close}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="flex max-h-[80vh] items-center justify-center overflow-auto rounded-lg bg-background">
              <Image
                src={src}
                alt={alt}
                width={1400}
                height={1000}
                className="h-auto w-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
