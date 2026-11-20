import { copy, profile, socialLinks } from '@/data/content';
import { ContactForm } from './contact-form';
import { Icon } from './icons';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-block"
    >
      <div className="container-page">
        <SectionHeading
          id="contact-heading"
          title={copy.sectionTitles.contact}
          subtitle={profile.contactInvitation}
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Direct links
              </h3>
              <div className="section-divider !mt-3" />

              <ul className="mt-5 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        link.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="flex items-center gap-3 rounded-card border border-line bg-surface-raised px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <Icon name={link.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 truncate">
                        {link.label === 'Email' ? profile.email : link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
