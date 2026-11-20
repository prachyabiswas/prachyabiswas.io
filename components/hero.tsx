import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { copy, profile } from '@/data/content';
import { Icon } from './icons';
import { Reveal } from './reveal';

/** Faint stars sit behind the copy; decorative only. */
const heroStars = [
  { left: '8%', top: '18%', size: 2, opacity: 0.5 },
  { left: '24%', top: '72%', size: 1, opacity: 0.35 },
  { left: '38%', top: '12%', size: 1, opacity: 0.4 },
  { left: '52%', top: '80%', size: 2, opacity: 0.3 },
  { left: '66%', top: '30%', size: 1, opacity: 0.45 },
  { left: '78%', top: '62%', size: 2, opacity: 0.35 },
  { left: '88%', top: '16%', size: 1, opacity: 0.5 },
  { left: '94%', top: '78%', size: 1, opacity: 0.3 },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px] dark:bg-violet-500/25"
      />
      <div
        aria-hidden="true"
        data-nosnippet
        className="pointer-events-none absolute inset-0"
      >
        {heroStars.map((star) => (
          <span
            key={`${star.left}-${star.top}`}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="container-page relative grid items-center gap-12 md:grid-cols-[1.08fr_0.92fr]">
        <Reveal className="order-2 md:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/60 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300 dark:border-violet-400/50 dark:text-violet-200">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            {profile.badgeText}
          </p>

          <h1
            id="home-heading"
            className="mt-7 text-[44px] font-extrabold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[72px]"
          >
            Hi I&apos;m <span className="hero-name-gradient">Prachya</span>{' '}
            <span className="text-foreground">Biswas</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-muted sm:text-xl">
            {profile.title}
          </p>

          <p className="mt-5 text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-[36px]">
            {profile.heroTagline}
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.heroHighlight}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn-violet">
              {copy.labels.viewProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-dark">
              {copy.labels.contactMe}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 md:order-2">
          <div className="relative mx-auto w-full max-w-sm md:ml-auto md:mr-0 md:translate-x-6">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-violet-500/20 opacity-40 blur-3xl" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-surface shadow-glow">
              <Image
                src={profile.photoLight}
                alt={profile.photoAlt}
                width={640}
                height={640}
                priority
                sizes="(min-width: 768px) 384px, 90vw"
                className="h-full w-full object-cover dark:hidden"
              />
              <Image
                src={profile.photoDark}
                alt={profile.photoAlt}
                width={640}
                height={640}
                priority
                sizes="(min-width: 768px) 384px, 90vw"
                className="hidden h-full w-full object-cover dark:block"
              />
              <div className="absolute bottom-4 left-4 chip border-line/60 bg-surface/90 backdrop-blur">
                {profile.photoCaption}
              </div>
              <div className="absolute right-4 top-4 chip border-line/60 bg-surface/90 backdrop-blur">
                <Icon name="mapPin" className="h-3.5 w-3.5 text-accent" />
                {profile.location}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
