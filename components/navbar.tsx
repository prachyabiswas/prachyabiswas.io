'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { copy, navigation, profile, type NavItem } from '@/data/content';
import { Icon } from './icons';

function sectionId(href: string): string | undefined {
  return href.startsWith('/#') ? href.slice(2) : undefined;
}

function itemSectionId(item: NavItem): string | undefined {
  return item.activeSection ?? sectionId(item.href);
}

function matchesRoute(pathname: string, item: NavItem): boolean {
  return (
    item.activeOn?.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    ) ?? false
  );
}

export function Navbar({ showWriting = true }: { showWriting?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState<string>('home');
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const moreItems = useMemo(
    () =>
      navigation.more.filter(
        (item) => showWriting || item.label !== 'Writing',
      ),
    [showWriting],
  );

  // Highlight whichever section is currently at the top of the viewport.
  useEffect(() => {
    if (!isHome) {
      setActive('');
      return;
    }

    const sectionIds = new Set(
      [...navigation.primary, ...moreItems]
        .map(itemSectionId)
        .filter((id): id is string => Boolean(id)),
    );

    const updateActive = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('main section[id]'),
      ).filter((section) => sectionIds.has(section.id));

      if (sections.length === 0) return;

      const marker = Math.min(window.innerHeight * 0.35, 260);
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      }

      // The last section can be shorter than the marker when scrolled to the end.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActive(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [isHome, moreItems]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const renderLink = (item: NavItem, onNavigate: () => void) => {
    const id = itemSectionId(item);
    const routeActive = matchesRoute(pathname, item);
    const sectionActive = isHome && Boolean(id) && active === id;
    const isActive = routeActive || sectionActive;

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        aria-current={
          routeActive ? ('page' as const) : sectionActive ? ('location' as const) : undefined
        }
        className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-2 text-sm font-medium transition duration-200 ${
          isActive
            ? 'bg-accent/10 text-accent'
            : 'text-muted hover:bg-surface-raised hover:text-foreground'
        }`}
      >
        <Icon name={item.icon} className="h-3.5 w-3.5 shrink-0" />
        <span>{item.label}</span>
      </Link>
    );
  };

  const moreActive = moreItems.some(
    (item) =>
      matchesRoute(pathname, item) ||
      (isHome && itemSectionId(item) === active),
  );

  return (
    <header className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-[980px] -translate-x-1/2">
      <nav
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setMoreOpen(false);
            setMobileOpen(false);
          }
        }}
        className="flex items-center justify-between gap-3 rounded-pill border border-line bg-surface/85 px-3 py-2 shadow-pill backdrop-blur-xl"
      >
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex shrink-0 items-center gap-2 rounded-pill py-1 pl-1 pr-2"
          aria-label={`${profile.name} — home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-gradient text-xs font-bold text-on-accent shadow-glow">
            {profile.shortName}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
            {profile.name}
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navigation.primary.map((item) => renderLink(item, () => setMoreOpen(false)))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-controls="nav-more-menu"
              className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-2 text-sm font-medium transition duration-200 ${
                moreActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-surface-raised hover:text-foreground'
              }`}
            >
              {copy.labels.more}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {moreOpen && (
              <div
                id="nav-more-menu"
                className="absolute right-0 top-full mt-2 w-64 rounded-card border border-line bg-surface p-2 shadow-card"
              >
                {moreItems.map((item) =>
                  renderLink(item, () => setMoreOpen(false)),
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile-menu"
          aria-label={mobileOpen ? copy.a11y.closeMenu : copy.a11y.openMenu}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground lg:hidden"
        >
          {mobileOpen ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <Menu size={18} aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="nav-mobile-menu"
          className="mt-2 flex max-h-[calc(100vh-6rem)] flex-col gap-1 overflow-y-auto rounded-card border border-line bg-surface p-3 shadow-card lg:hidden"
        >
          {[...navigation.primary, ...moreItems].map((item) =>
            renderLink(item, () => setMobileOpen(false)),
          )}
        </div>
      )}
    </header>
  );
}
