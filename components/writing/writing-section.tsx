import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import Link from 'next/link';
import { copy } from '@/data/content';
import {
  formatArticleDate,
  getArticleSummaries,
  type ArticleSummary,
} from '@/lib/writing';
import { Reveal } from '../reveal';
import { SectionHeading } from '../section-heading';

function ArticleMeta({ article }: { article: ArticleSummary }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={13} aria-hidden="true" />
        {formatArticleDate(article.date, article.language)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 size={13} aria-hidden="true" />
        {article.readingTime} {copy.writing.minuteRead}
      </span>
    </div>
  );
}

export function WritingSection() {
  const articles = getArticleSummaries();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles
    .filter((article) => article.slug !== featured?.slug)
    .slice(0, 4);

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading
          id="writing-heading"
          title={copy.sectionTitles.writing}
          subtitle={copy.writing.subtitle}
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            {featured ? (
              <article className="card relative flex h-full flex-col overflow-hidden p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent-gradient opacity-10 blur-3xl" />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex flex-wrap gap-2">
                    <span className="chip w-fit border-accent/30 bg-accent/10 text-accent">
                      {copy.writing.featuredLabel}
                    </span>
                    {featured.sample ? (
                      <span className="chip w-fit">{copy.writing.sampleLabel}</span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold leading-snug text-foreground">
                    {featured.title}
                  </h3>
                  <ArticleMeta article={featured} />
                  <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-muted sm:text-[15px]">
                    {featured.excerpt}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <li key={tag} className="chip">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/writing/${featured.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    {copy.writing.readEssay}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ) : null}
          </Reveal>

          <Reveal delay={100}>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                {copy.writing.moreFromJournal}
              </h3>
              <p className="mt-1 text-xs text-muted">
                {articles.length}{' '}
                {articles.length === 1
                  ? copy.writing.articleSingular
                  : copy.writing.articlePlural}
              </p>
              <div className="section-divider !mt-4" />

              {latest.length > 0 ? (
                <ul className="mt-2 divide-y divide-line">
                  {latest.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/writing/${article.slug}`}
                        className="group flex items-start justify-between gap-4 py-4"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-snug text-foreground transition group-hover:text-accent">
                            {article.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted">
                            {article.excerpt}
                          </span>
                          <span className="mt-1.5 block text-[11px] text-faint">
                            {formatArticleDate(article.date, article.language)} ·{' '}
                            {article.readingTime} {copy.writing.minuteRead}
                          </span>
                        </span>
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition group-hover:border-accent group-hover:text-accent">
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted">
                  {copy.writing.moreComing}
                </p>
              )}

              <div className="mt-2 border-t border-line pt-4">
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  {copy.writing.exploreAll}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
