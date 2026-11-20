import { copy, socialLinks } from '@/data/content';
import { Icon } from './icons';

export function Footer() {
  const links = socialLinks.filter(
    (link) =>
      link.label === 'GitHub' ||
      link.label === 'LinkedIn' ||
      link.label === 'Facebook',
  );

  return (
    <footer className="relative z-10 border-t border-line/70 py-10">
      <div className="container-page flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{copy.footer.line}</p>

        <ul className="flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon name={link.icon} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
