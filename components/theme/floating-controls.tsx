'use client';

import { ArrowUp, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { copy } from '@/data/content';
import { useTheme } from './theme-provider';

export function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={copy.a11y.scrollToTop}
        className={`icon-button transition-all duration-300 ${
          showScrollTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <ArrowUp size={18} strokeWidth={2} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? copy.a11y.switchToLight : copy.a11y.switchToDark}
        title={theme === 'dark' ? copy.a11y.switchToLight : copy.a11y.switchToDark}
        className="icon-button h-11 w-11"
      >
        {theme === 'dark' ? (
          <Sun size={19} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Moon size={19} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
