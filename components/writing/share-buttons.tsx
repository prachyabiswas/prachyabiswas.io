'use client';

import { Link2, Linkedin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { copy } from '@/data/content';
import { siteUrl } from '@/lib/site';
import { Icon } from '../icons';

export function ShareButtons({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = `${siteUrl}/writing/${slug}`;

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
      <span className="text-sm font-medium text-muted">{copy.writing.share}</span>

      <button type="button" onClick={copyLink} className="chip hover:border-accent hover:text-accent">
        <Link2 size={14} aria-hidden="true" />
        {copied ? copy.writing.copied : copy.writing.copyLink}
      </button>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.writing.shareOnLinkedIn}
        title={copy.writing.shareOnLinkedIn}
        className="icon-button h-9 w-9"
      >
        <Linkedin size={15} aria-hidden="true" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.writing.shareOnX}
        title={copy.writing.shareOnX}
        className="icon-button h-9 w-9"
      >
        <Icon name="x" className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
