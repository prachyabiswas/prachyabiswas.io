import type { Metadata } from 'next';
import { AchievementsSection } from '@/components/achievements';
import { Contact } from '@/components/contact';
import { ExperienceSection } from '@/components/experience';
import { Hero } from '@/components/hero';
import { LeadershipSection } from '@/components/leadership';
import { ProjectsSection } from '@/components/projects';
import { SkillsSection } from '@/components/skills';
import { TalksSection } from '@/components/talks';
import { WritingSection } from '@/components/writing/writing-section';
import { profile } from '@/data/content';
import { siteDescription, siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: siteName },
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: ['/opengraph-image'],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <AchievementsSection />
      <SkillsSection />
      <ProjectsSection />
      <LeadershipSection />
      <WritingSection />
      <TalksSection />
      <Contact />
    </>
  );
}
