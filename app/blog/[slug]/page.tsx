import type { Metadata } from 'next';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { copy, profile } from '@/data/content';
import { mdxOptions } from '@/lib/mdx';
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
} from '@/lib/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [profile.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const gallery = post.gallery.length
    ? post.gallery
    : post.coverImage
      ? [post.coverImage]
      : [];

  return (
    <article className="container-page pb-20 pt-32 md:pt-40">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {copy.blog.backToBlog}
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip border-accent/30 bg-accent/10 text-accent">
            {post.category}
          </span>
          {post.sample ? (
            <span className="chip">{copy.blog.sampleLabel}</span>
          ) : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {post.excerpt}
        </p>

        <p className="mt-5 flex items-center gap-1.5 text-sm text-muted">
          <CalendarDays size={15} aria-hidden="true" />
          {formatBlogDate(post.date)}
        </p>
      </header>

      {post.coverImage ? (
        <div className="relative mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <Image
            src={post.coverImage}
            alt={`${post.title} cover photo`}
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="article-body mt-10 max-w-3xl">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>

      {gallery.length > 0 ? (
        <section className="mt-12 max-w-4xl" aria-label={copy.blog.photos}>
          <h2 className="text-xl font-semibold text-foreground">
            {copy.blog.photos}
          </h2>
          <div className="section-divider !mt-3" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {gallery.map((photo, index) => (
              <div
                key={`${post.slug}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface-raised"
              >
                <Image
                  src={photo}
                  alt={`${post.title} photo ${index + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
