import { copy, skills, type SkillGroup } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

const columns: Array<1 | 2 | 3> = [1, 2, 3];

function SkillCard({ groups }: { groups: SkillGroup[] }) {
  return (
    <article className="card h-full p-6">
      <div className="divide-y divide-line">
        {groups.map((group) => (
          <div key={group.title} className="py-6 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-card bg-accent/10 text-accent">
                <Icon name={group.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {group.title}
              </h3>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.name} className="chip">
                  {skill.icon ? (
                    <Icon
                      name={skill.icon}
                      className="h-3.5 w-3.5 text-accent"
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-gradient" />
                  )}
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading id="skills-heading" title={copy.sectionTitles.skills} />

        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((column, index) => {
            const groups = skills.filter((group) => group.column === column);
            if (groups.length === 0) return null;

            return (
              <Reveal key={column} delay={index * 60}>
                <SkillCard groups={groups} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
