import { copy, leadership } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading
          id="leadership-heading"
          title={copy.sectionTitles.leadership}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {leadership.map((item, index) => (
            <Reveal key={item.id} delay={index * 50}>
              <article className="card h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
