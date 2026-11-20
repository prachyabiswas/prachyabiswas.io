'use client';

import { ArrowUpRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { copy } from '@/data/content';
import {
  formatBlogDate,
  formatBlogMonth,
  type BlogCategory,
  type BlogPostSummary,
} from '@/lib/blog-shared';

export function BlogArchive({
  posts,
  categories,
}: {
  posts: BlogPostSummary[];
  categories: BlogCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | ''>('');

  const groups = useMemo(() => {
    const filtered = activeCategory
      ? posts.filter((post) => post.category === activeCategory)
      : posts;

    const byMonth = new Map<string, BlogPostSummary[]>();
    for (const post of filtered) {
      const key = post.date.slice(0, 7);
      const bucket = byMonth.get(key) ?? [];
      bucket.push(post);
      byMonth.set(key, bucket);
    }

    return Array.from(byMonth.entries()).map(([key, monthPosts]) => ({
      key,
      label: formatBlogMonth(`${key}-01`),
      posts: monthPosts,
    }));
  }, [posts, activeCategory]);

  return (
    <>
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label={copy.a11y.filterByCategory}
      >
        <button
          type="button"
          onClick={() => setActiveCategory('')}
          aria-pressed={activeCategory === ''}
          className={`chip transition ${
            activeCategory === ''
              ? 'border-accent bg-accent/10 text-accent'
              : 'hover:border-accent hover:text-accent'
          }`}
        >
          {copy.blog.allCategories}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`chip transition ${
              activeCategory === category
                ? 'border-accent bg-accent/10 text-accent'
                : 'hover:border-accent hover:text-accent'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <p className="mt-8 text-sm text-muted">{copy.blog.noPosts}</p>
      ) : (
        <div className="mt-8 space-y-10">
          {groups.map((group) => (
            <section key={group.key} aria-label={group.label}>
              <h2 className="text-lg font-semibold text-foreground">
                {group.label}
              </h2>
              <div className="section-divider !mt-3" />

              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <article className="card flex h-full flex-col overflow-hidden">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative aspect-[16/10] block border-b border-line bg-surface-raised"
                      >
                        <Image
                          src={
                            post.coverImage ??
                            '/images/writing-placeholder.svg'
                          }
                          alt={`${post.title} cover photo`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="chip border-accent/30 bg-accent/10 text-accent">
                            {post.category}
                          </span>
                          {post.sample ? (
                            <span className="chip">{copy.blog.sampleLabel}</span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="transition hover:text-accent"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                          {post.excerpt}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                            <CalendarDays size={13} aria-hidden="true" />
                            {formatBlogDate(post.date)}
                          </span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                          >
                            {copy.labels.readMore}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
