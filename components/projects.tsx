import { copy, projects } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading
          id="projects-heading"
          title={copy.sectionTitles.projects}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 50}>
              <article className="card flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <li key={technology} className="chip">
                      {technology}
                    </li>
                  ))}
                </ul>

                {project.links.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                    {project.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
