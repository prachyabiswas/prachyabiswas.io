import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { AtmosphericBackground } from '@/components/atmospheric-background';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { FloatingControls } from '@/components/theme/floating-controls';
import {
  ThemeProvider,
  themeInitScript,
} from '@/components/theme/theme-provider';
import { profile, socialLinks } from '@/data/content';
import { siteDescription, siteName, siteUrl } from '@/lib/site';
import { getArticleSummaries } from '@/lib/writing';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: `${siteName} Portfolio`,
  authors: [{ name: siteName }],
  creator: siteName,
  keywords: profile.seoKeywords,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteName} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08090e' },
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    email: `mailto:${profile.email}`,
    description: profile.tagline,
    sameAs: socialLinks
      .filter((link) => link.href.startsWith('http'))
      .map((link) => link.href),
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${bengali.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <AtmosphericBackground />
          <Navbar showWriting={getArticleSummaries().length > 1} />
          <main className="relative z-10">{children}</main>
          <Footer />
          <FloatingControls />
        </ThemeProvider>
      </body>
    </html>
  );
}
