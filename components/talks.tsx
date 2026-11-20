import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { copy, features, seminars } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';
import { TalkCard } from './talk-card';

export function TalksSection() {
  const latest = seminars.slice(0, 3);
  const visibleFeatures = features.filter((feature) => feature.href.trim());

  return (
    <section id="talks" aria-labelledby="talks-heading" className="section-block">
      <div className="container-page">
        <SectionHeading
          id="talks-heading"
          title={copy.sectionTitles.talks}
          subtitle={copy.talks.intro}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((seminar, index) => (
            <Reveal key={seminar.slug} delay={index * 50}>
              <TalkCard seminar={seminar} />
            </Reveal>
          ))}
        </div>

        {visibleFeatures.length ? (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-foreground">
              {copy.talks.featuresTitle}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {visibleFeatures.map((feature) => (
                <li key={feature.source}>
                  <a
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex items-start gap-3 p-4 transition hover:border-accent"
                  >
                    <Icon
                      name="externalLink"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    />
                    <span>
                      <span className="block font-semibold text-foreground">
                        {feature.source}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {feature.line}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 text-center">
          <Link href="/talks" className="btn-secondary">
            {copy.talks.viewAll}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
