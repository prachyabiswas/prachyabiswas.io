'use client';

import { ArrowUpRight, CalendarDays, Clock3, Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { copy } from '@/data/content';
import {
  formatArticleDate,
  type ArticleSummary,
} from '@/lib/writing-shared';

export function WritingArchive({
  articles,
  tags,
}: {
  articles: ArticleSummary[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState('');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesTag = !activeTag || article.tags.includes(activeTag);
      const matchesQuery =
        !needle ||
        [article.title, article.excerpt, ...article.tags]
          .join(' ')
          .toLowerCase()
          .includes(needle);
      return matchesTag && matchesQuery;
    });
  }, [articles, activeTag, query]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={copy.a11y.filterByTag}>
          <button
            type="button"
            onClick={() => setActiveTag('')}
            aria-pressed={activeTag === ''}
            className={`chip transition ${
              activeTag === ''
                ? 'border-accent bg-accent/10 text-accent'
                : 'hover:border-accent hover:text-accent'
            }`}
          >
            {copy.writing.allTags}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`chip transition ${
                activeTag === tag
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'hover:border-accent hover:text-accent'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <label className="relative block w-full lg:w-72">
          <span className="sr-only">{copy.writing.searchPlaceholder}</span>
          <Search
            size={16}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.writing.searchPlaceholder}
            className="field-input !rounded-pill !py-2.5 pl-11"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          {copy.writing.noArticles}
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {filtered.map((article) => (
            <li key={article.slug}>
              <article className="card flex h-full flex-col p-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} aria-hidden="true" />
                    {formatArticleDate(article.date, article.language)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} aria-hidden="true" />
                    {article.readingTime} {copy.writing.minuteRead}
                  </span>
                  {article.featured ? (
                    <span className="chip border-accent/30 bg-accent/10 text-accent">
                      {copy.writing.featuredLabel}
                    </span>
                  ) : null}
                  {article.sample ? (
                    <span className="chip">{copy.writing.sampleLabel}</span>
                  ) : null}
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                  <Link
                    href={`/writing/${article.slug}`}
                    className="transition hover:text-accent"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">
                  {article.excerpt}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li key={tag} className="chip">
                      #{tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-line pt-4">
                  <Link
                    href={`/writing/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    {copy.writing.readEssay}
                    <ArrowUpRight size={15} aria-hidden="true" />
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
