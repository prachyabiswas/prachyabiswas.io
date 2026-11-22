import Image from 'next/image';
import { Fragment } from 'react';
import { copy, experience } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/** Turns "Apr 7, 2026 – Present" into "Apr 7, 2026 – Present · 7 mos". */
function periodWithDuration(period: string): string {
  const match = period.match(/^([A-Za-z]+ \d{1,2}, \d{4}) – Present$/);
  if (!match) return period;

  const start = new Date(`${match[1]} UTC`);
  const now = new Date();
  let months =
    (now.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    now.getUTCMonth() -
    start.getUTCMonth();
  if (now.getUTCDate() < start.getUTCDate()) months -= 1;

  if (months < 0) return period;
  if (months < 1) return `${period} · < 1 mo`;
  return `${period} · ${months} ${months === 1 ? 'mo' : 'mos'}`;
}

function initials(organization: string): string {
  const words = organization
    .replace(/[(),]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !/^(the|of|and|for)$/i.test(word));
  return (words[0]?.[0] ?? '') + (words[1]?.[0] ?? '');
}

/** Renders **bold** segments inside a bullet. */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, index) => (
        <Fragment key={index}>
          {index % 2 === 1 ? (
            <strong className="font-semibold text-foreground">{part}</strong>
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  );
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
          {experience.map((role, index) => {
            const period = periodWithDuration(role.period);

            return (
              <Reveal
                key={`${role.organization}-${role.role}`}
                delay={index * 60}
              >
                <article className="card grid overflow-hidden md:grid-cols-[230px_1fr]">
                  {/* Left: organisation, dates, location, links */}
                  <div className="flex flex-col p-6 md:border-r md:border-line">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white shadow-pill">
                      {role.logo ? (
                        <Image
                          src={role.logo}
                          alt={`${role.organization} logo`}
                          width={56}
                          height={56}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="text-sm font-bold text-accent"
                        >
                          {initials(role.organization)}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                      {role.organizationUrl ? (
                        <a
                          href={role.organizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-accent"
                        >
                          {role.organization}
                        </a>
                      ) : (
                        role.organization
                      )}
                    </h3>

                    <div className="my-4 h-px w-full bg-line" />

                    <ul className="space-y-2 text-xs text-muted">
                      <li className="flex items-start gap-2">
                        <Icon
                          name="calendar"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint"
                        />
                        <span>{period}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          name="mapPin"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint"
                        />
                        <span>{role.location}</span>
                      </li>
                    </ul>

                    {role.links?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:mt-auto md:pt-4">
                        {role.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-foreground"
                            >
                              {link.label}
                              <Icon
                                name="externalLink"
                                className="h-3 w-3"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {/* Right: role and highlights */}
                  <div className="p-6 md:pl-8">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <h4 className="text-xl font-semibold tracking-tight text-foreground">
                        {role.role}
                      </h4>
                      <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <Icon
                          name="calendar"
                          className="h-3.5 w-3.5 text-faint"
                        />
                        {period}
                      </p>
                    </div>

                    {role.tag ? (
                      <span className="chip mt-2 !px-2.5 !py-1 !text-[11px]">
                        <Icon name="users" className="h-3 w-3" />
                        {role.tag}
                      </span>
                    ) : null}

                    <ul className="mt-4 space-y-2.5">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-6 text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-faint"
                          />
                          <span>
                            <Highlighted text={bullet} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
