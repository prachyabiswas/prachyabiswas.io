import { ArrowRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { copy } from '@/data/content';
import { formatBlogDate, getBlogPostSummaries } from '@/lib/blog';
import { Reveal } from '../reveal';
import { SectionHeading } from '../section-heading';

export function BlogSection() {
  const posts = getBlogPostSummaries().slice(0, 3);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="section-block">
      <div className="container-page">
        <SectionHeading
          id="blog-heading"
          title={copy.sectionTitles.blog}
          subtitle={copy.blog.subtitle}
        />

        {posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 50}>
                <article className="card flex h-full flex-col overflow-hidden">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative aspect-[16/10] block border-b border-line bg-surface-raised"
                  >
                    <Image
                      src={
                        post.coverImage ?? '/images/writing-placeholder.svg'
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

                    <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-xs text-muted">
                      <CalendarDays size={13} aria-hidden="true" />
                      {formatBlogDate(post.date)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}

        <div className="mt-8 text-center">
          <Link href="/blog" className="btn-secondary">
            {copy.blog.viewAllPosts}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
