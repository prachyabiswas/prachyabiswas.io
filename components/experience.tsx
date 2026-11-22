import Image from 'next/image';
import { copy, experience } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/** Turns an Apr 7, 2026 – Present period into Apr 7, 2026 – Present · 7 months. */
function periodWithDuration(period: string): string {
  const match = period.match(/^([A-Za-z]+ \d{1,2}, \d{4}) – Present$/);
  if (!match) return period;

  const start = new Date(`${match[1]} UTC`);
  const now = new Date();
  const months =
    (now.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    now.getUTCMonth() -
    start.getUTCMonth();

  if (months < 0) return period;
  return `${period} · ${months} month${months === 1 ? '' : 's'}`;
}

function initials(organization: string): string {
  const words = organization
    .replace(/[(),]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !/^(the|of|and|for)$/i.test(word));
  return (words[0]?.[0] ?? '') + (words[1]?.[0] ?? '');
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading
          id="experience-heading"
          title={copy.sectionTitles.experience}
        />

        <div className="space-y-5">
          {experience.map((role, index) => (
            <Reveal key={`${role.organization}-${role.role}`} delay={index * 60}>
              <article className="card grid gap-6 p-6 md:grid-cols-[260px_1fr] md:p-7">
                <div className="flex flex-col gap-4 md:border-r md:border-line md:pr-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-surface-raised text-sm font-bold text-accent">
                      {role.logo ? (
                        <Image
                          src={role.logo}
                          alt={`${role.organization} logo`}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span aria-hidden="true">
                          {initials(role.organization)}
                        </span>
                      )}
                    </div>
                    {role.organizationUrl ? (
                      <a
                        href={role.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground transition hover:text-accent"
                      >
                        {role.organization}
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground">
                        {role.organization}
                      </p>
                    )}
                  </div>

                  {role.links?.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {role.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chip transition hover:border-accent hover:text-accent"
                          >
                            <Icon
                              name={link.icon ?? 'externalLink'}
                              className="h-3.5 w-3.5"
                            />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {role.role}
                    </h3>
                    <p className="text-sm text-muted">
                      {periodWithDuration(role.period)}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-faint">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="mapPin" className="h-3.5 w-3.5" />
                      {role.location}
                    </span>
                    <span className="chip !px-2.5 !py-1 !text-[11px]">
                      {role.tag}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {role.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
