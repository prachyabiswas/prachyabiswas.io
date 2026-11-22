import fs from 'node:fs';
import path from 'node:path';
import { achievements, copy, type AchievementRow } from '@/data/content';
import { CertificateLightbox } from './certificate-lightbox';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

function showYear(year: string): boolean {
  return year.trim().length > 0 && !year.trim().startsWith('[');
}

function certificateExists(certificatePath?: string): boolean {
  if (!certificatePath) return false;
  return fs.existsSync(path.join(process.cwd(), 'public', certificatePath));
}

function AchievementCard({ row, index }: { row: AchievementRow; index: number }) {
  const hasCertificate = certificateExists(row.certificatePath);

  return (
    <Reveal delay={index * 50}>
      <article className="card flex h-full flex-col p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-raised text-accent">
          <Icon name={row.icon} className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold leading-snug text-foreground">
          {row.title}
        </h3>
        {showYear(row.year) ? (
          <p className="mt-1 text-sm font-medium text-accent">{row.year}</p>
        ) : null}
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{row.detail}</p>
        {hasCertificate && row.certificatePath ? (
          <CertificateLightbox
            src={row.certificatePath}
            alt={row.certificateAlt ?? row.title}
          />
        ) : null}
      </article>
    </Reveal>
  );
}

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading
          id="achievements-heading"
          title={copy.sectionTitles.achievements}
        />

        <h3 className="mt-10 text-lg font-semibold text-foreground">
          {copy.achievements.honorsTitle}
        </h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.honors.map((row, index) => (
            <AchievementCard key={row.id} row={row} index={index} />
          ))}
        </div>

        <h3 className="mt-14 text-lg font-semibold text-foreground">
          {copy.achievements.competitionsTitle}
        </h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.competitions.map((row, index) => (
            <AchievementCard key={row.id} row={row} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
