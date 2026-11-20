import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ShareButtons } from '@/components/writing/share-buttons';
import { copy, profile } from '@/data/content';
import { mdxOptions } from '@/lib/mdx';
import { siteUrl } from '@/lib/site';
import {
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
} from '@/lib/writing';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const image = `/writing/${article.slug}/opengraph-image`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/writing/${article.slug}`,
      publishedTime: article.date,
      authors: [profile.name],
      tags: article.tags,
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articles = getAllArticles();
  const index = articles.findIndex((item) => item.slug === article.slug);
  const previous = articles[index + 1];
  const next = articles[index - 1];
  const language = article.language === 'bn' ? 'bn' : 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: profile.name, url: siteUrl },
    publisher: { '@type': 'Person', name: profile.name },
    mainEntityOfPage: `${siteUrl}/writing/${article.slug}`,
    image: `${siteUrl}/writing/${article.slug}/opengraph-image`,
    keywords: article.tags.join(', '),
    inLanguage: language,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article
        lang={language}
        className="container-page pb-20 pt-32 md:pt-40"
      >
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {copy.writing.backToWriting}
        </Link>

        <header className="mt-8 max-w-3xl">
          <ul className="flex flex-wrap gap-2">
            {article.sample ? (
              <li className="chip">{copy.writing.sampleLabel}</li>
            ) : null}
            {article.tags.map((tag) => (
              <li key={tag} className="chip">
                #{tag}
              </li>
            ))}
          </ul>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>
              {copy.writing.by} <span className="font-medium text-foreground">{profile.name}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden="true" />
              {formatArticleDate(article.date, article.language)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={15} aria-hidden="true" />
              {article.readingTime} {copy.writing.minuteRead}
            </span>
          </div>
        </header>

        {article.coverImage ? (
          <div className="mt-8 max-w-3xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        <div
          className={`article-body mt-10 max-w-3xl ${
            language === 'bn' ? 'prose-bangla' : ''
          }`}
        >
          <MDXRemote source={article.content} options={mdxOptions} />
        </div>

        <ShareButtons title={article.title} slug={article.slug} />

        <nav
          aria-label={copy.a11y.articleNavigation}
          className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/writing/${previous.slug}`}
              className="card group p-5 transition hover:border-accent"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
                <ArrowLeft size={13} aria-hidden="true" />
                {copy.writing.previous}
              </span>
              <span className="mt-2 block text-sm font-semibold text-foreground group-hover:text-accent">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/writing/${next.slug}`}
              className="card group p-5 transition hover:border-accent sm:text-right"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-medium text-muted">
                {copy.writing.next}
                <ArrowRight size={13} aria-hidden="true" />
              </span>
              <span className="mt-2 block text-sm font-semibold text-foreground group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </>
  );
}
