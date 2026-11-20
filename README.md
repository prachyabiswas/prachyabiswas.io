
# Prachya Biswas — Portfolio

Personal portfolio for Prachya Biswas, ML and AI Engineer. Built with Next.js App Router, TypeScript, Tailwind CSS, MDX and Resend. Deployable on Vercel or directly on cPanel via its Node.js Selector.

The home page is a single scrolling page: navbar links move between sections. Writing, Notes and Books, Talks and Features, and Blog have their own archive pages, with individual article, note and post pages. It has a dark default theme with a decorative coding atmosphere, plus a clean light theme.

## Quick start

```bash
cp .env.example .env.local   # fill in the values you have
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

Node 18.18+ is required (Node 22 recommended).

## Project structure

```
app/
  api/contact/              Resend-backed contact endpoint
  writing/                  /writing archive and /writing/[slug] article pages
  writing/[slug]/opengraph-image.tsx
  notes/                    /notes page and /notes/[slug] note pages
  talks/                    /talks seminar archive
  blog/                     /blog archive and /blog/[slug] post pages
  rss.xml/route.ts          generated RSS feed
  globals.css               theme tokens, base styles, article/code typography
  layout.tsx                fonts, theme bootstrap, navbar, footer, Person JSON-LD
  page.tsx                  single-page home sections
  opengraph-image.tsx       generated home social image
  sitemap.ts, robots.ts
components/
  writing/                  home writing section, archive filters, share buttons
  notes/                    notes archive filters
  blog/                     home blog section and archive filters
  ...                       navbar, hero, sections, contact, theme, background
content/writing/            MDX articles (new files publish automatically)
content/notes/              MDX study notes
content/blog/               MDX photo-led blog posts
data/content.ts             ALL editable site content, types and UI copy
lib/
  writing.ts                reads/sorts writing MDX front matter
  notes.ts                  reads/sorts note MDX front matter
  blog.ts                   reads/sorts blog MDX front matter
  mdx.ts                    shared remark/rehype pipeline
  format.ts, site.ts, og-image.tsx
public/images/, public/logos/
```

## Editing site content

Everything visible on the site lives in `data/content.ts`: `profile`, `stats`, `atAGlance`, `education`, `experience`, `achievements`, `skills`, `projects`, `leadership`, `talks`, `socialLinks`, `navigation` and `copy` (all headings, labels, form messages and a11y text). Edit those values; components read from them and need no changes.

Invented numbers and examples are marked as placeholders in that file. See the replacement checklist below before publishing.

## Adding an article

1. Create a new `.mdx` file in `content/writing/`, e.g. `content/writing/my-new-post.mdx`.
2. Add front matter:

```mdx
---
title: "My New Post"
slug: "my-new-post"
date: "2026-11-01"
excerpt: "A short summary shown on the home page and archive."
tags: ["Machine Learning", "Notes"]
featured: false
language: "en"          # "en" or "bn"
coverImage: "/images/writing-placeholder.svg"  # optional
---
```

3. Write the body using Markdown and MDX. Supported: headings, lists, links, blockquotes, GFM tables, fenced code blocks with syntax highlighting, inline/display KaTeX math (`$...$` / `$$...$$`) and figures:

```mdx
<figure>
  <img src="/images/writing-placeholder.svg" alt="Description" />
  <figcaption>Caption text.</figcaption>
</figure>
```

4. Save. `lib/writing.ts` picks up the file automatically. It appears on the home Writing section, in the archive (newest first), in `/sitemap.xml`, in `/rss.xml`, and gets a static page with generated metadata, JSON-LD and an Open Graph image. No component code changes are needed.

Set `featured: true` on exactly one article for the large home-page card; if none is featured, the newest article is used. Set `language: "bn"` for Bengali — the article element gets `lang="bn"` and the Noto Sans Bengali font. Set `sample: true` to show the "Sample article" label. The Writing nav item stays hidden while only one article exists and appears automatically when a second one is added.

Notes live in `content/notes/` (`group` is `Machine Learning`, `AI` or `Mathematics`) and blog posts live in `content/blog/` (`category` is `University`, `Olympiad`, `Competitions`, `Teaching` or `Other`). Both use the same MDX pipeline.

## Theme

Colors, fonts, radius, spacing and shadows are defined once in `app/globals.css` and exposed through `tailwind.config.ts`. Dark is the default; `html.light` switches tokens. The choice is stored in `localStorage` as `portfolio-theme`, and an inline script in `app/layout.tsx` applies it before paint to avoid a flash. Floating controls at the bottom right toggle the theme and scroll to top.

`components/atmospheric-background.tsx` renders the drifting code layer, floating symbols and moving glowing star particles in both themes (code appears on the left side only; particles are stronger in dark mode and subtler in light mode). It is `fixed`, `pointer-events-none`, `aria-hidden="true"`, `data-nosnippet`, respects `prefers-reduced-motion` and reduces elements on mobile.

## Environment variables

Copy `.env.example` to `.env.local` (git-ignored):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend API key. |
| `CONTACT_TO_EMAIL` | Inbox that receives contact messages. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, OG images, sitemap, RSS and share links. No trailing slash. |

### Resend setup

1. Create an account at [resend.com](https://resend.com) and create an API key.
2. Add it as `RESEND_API_KEY` in `.env.local`.
3. Set `CONTACT_TO_EMAIL` to the inbox that should receive messages.
4. Verify your sending domain in Resend and replace the `from` address in `app/api/contact/route.ts` with an address on your domain. The included `onboarding@resend.dev` address is for development only.
5. Never commit `.env.local`.

The contact form validates in the browser and again on the server, includes a honeypot, and rate-limits to 3 messages per IP per minute (per serverless instance). Without the env vars, the endpoint returns a clear 503 error instead of pretending to send.

## Deployment on Vercel

1. Push to GitHub and import the repository in Vercel.
2. Add the three environment variables in **Project Settings → Environment Variables**.
3. Deploy; Vercel runs `npm run build`.
4. Add your custom domain in **Project Settings → Domains** and create the DNS records Vercel provides.
5. Keep HTTPS enforced (Vercel issues and renews certificates automatically). Do not disable "Redirect HTTP to HTTPS".
6. Add `www` and redirect it to the apex domain (or the reverse) in the Domains settings. Set `NEXT_PUBLIC_SITE_URL` to the final canonical URL so canonical tags, OG images, sitemap and RSS match.
7. Submit `https://your-domain/sitemap.xml` to Google Search Console and request indexing for the home page.

## Deployment on cPanel

See [CPANEL_DEPLOY.md](./CPANEL_DEPLOY.md) for full instructions. In short: upload the repo outside `public_html`, set the three environment variables in Node.js Selector, run `npm run build:cpanel`, create the Node.js app with `server.js` as the startup file, and copy `.htaccess.cpanel.example` to `public_html/.htaccess` with the assigned port. `build:cpanel` produces a standalone bundle with `public/` and `.next/static/` copied into it, so the app does not need Vercel to serve assets.

For GitHub auto-deploy with no SSH, `.github/workflows/deploy-cpanel.yml` builds the standalone bundle on GitHub, attaches `cpanel-standalone.tar.gz` to a GitHub Release, and publishes the built files to a `deploy` branch. cPanel Git Version Control pulls that branch over HTTPS and `scripts/cpanel-cron-pull.sh` restarts the app, so the shared host never runs `next build`/`next dev`. See [CPANEL_DEPLOY.md](./CPANEL_DEPLOY.md#auto-deploy-from-github-no-ssh-required).

## SEO notes

- Home title: `Prachya Biswas | ML and AI Engineer`; H1 contains the full name.
- Unique descriptions, canonical URLs, Open Graph/Twitter cards and generated OG images for the home page and every article.
- `Person` JSON-LD on the site and `Article` JSON-LD on each article.
- `app/sitemap.ts` includes the home page, `/writing` and all articles. `robots.txt` points to the sitemap. `/rss.xml` lists all articles.
- All content is server-rendered; client components only handle the theme toggle, menus, form, scroll reveal, archive filters and share buttons. Home sections are plain anchors, so deep links such as `/#projects` land on the right section without JavaScript.

## Replacement checklist before publishing

- [ ] Add the three organization logos and set `experience[].logo` / `experience[].organizationUrl` when Prachya sends them. Initials are shown until then.
- [ ] Add the certificate JPGs at `public/certificates/*.jpg`; the “View certificate” labels appear automatically when the files exist.
- [ ] Add seminar photos under `public/talks/[slug]/` and fill the missing seminar dates, summaries, topics and reference links.
- [ ] Replace `[period]`, `[year]`, `[tag]` and `[one line from Prachya]` placeholders across content as real values arrive.
- [ ] Add Kaggle and IEEE BRACU URLs to `socialLinks` / JSON-LD `sameAs` once they are sent.
- [ ] Replace the sample article, sample note and sample post with real MDX files and real photos.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the purchased domain and finish the Vercel domain setup.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real domain and finish the Vercel domain setup.
- [ ] Add a real `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and a verified sending domain.
