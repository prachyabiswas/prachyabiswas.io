import { decorative } from '@/data/content';

/**
 * Decorative-only atmosphere, rendered on every page in both themes.
 * Drifting code appears on the left side only, and moving star particles
 * are present in both themes (stronger in dark mode). Everything is fixed, non-interactive,
 * aria-hidden and data-nosnippet so it never reads as page content.
 */
export function AtmosphericBackground() {
  const codeColumn = () => {
    return (
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden font-mono text-[11px] leading-7 sm:text-xs lg:text-sm">
        <div className="animate-code-drift will-change-transform">
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="space-y-1 py-3">
              {decorative.codeLines.map((line, index) => (
                <div
                  key={`${copy}-${index}`}
                  className="flex min-h-7 gap-4 whitespace-pre"
                  style={{
                    color: 'rgb(var(--code-tint) / var(--code-opacity))',
                  }}
                >
                  <span
                    className="hidden w-7 shrink-0 text-right md:inline"
                    style={{
                      color:
                        'rgb(var(--code-tint) / var(--code-num-opacity))',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={index % 3 === 2 ? 'hidden lg:inline' : ''}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      aria-hidden="true"
      data-nosnippet
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Soft gradient glows */}
      <div
        className="absolute -left-40 -top-52 h-[560px] w-[560px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, var(--glow-one), transparent 70%)',
        }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, var(--glow-two), transparent 70%)',
          animationDelay: '-5s',
        }}
      />

      {/* Faint dot matrix */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(var(--grid-dot) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
        }}
      />

      {/* Drifting code on the left only, with a seamless loop. */}
      {codeColumn()}

      {/* Floating math / coding symbols */}
      <div className="absolute inset-0">
        {decorative.symbols.map((symbol, index) => (
          <span
            key={`${symbol.char}-${index}`}
            className={`absolute animate-float-slow font-mono ${
              symbol.blur ? 'blur-[1px]' : ''
            } ${symbol.mobile ? '' : 'hidden sm:block'}`}
            style={{
              left: `${symbol.x}%`,
              top: `${symbol.y}%`,
              fontSize: `${symbol.size}rem`,
              animationDelay: `${symbol.delay}s`,
              color: 'rgb(var(--color-accent) / var(--symbol-opacity))',
            }}
          >
            {symbol.char}
          </span>
        ))}
      </div>

      {/* Moving glowing particles — stronger in dark mode, subtle in light */}
      <div className="absolute inset-0">
        {decorative.particles.map((particle, index) => {
          const rgbVar =
            particle.color === 'accent-2'
              ? '--color-accent-2'
              : '--color-accent';

          return (
            <span
              key={`${particle.x}-${particle.y}-${index}`}
              className="star-particle absolute rounded-full animate-particle-drift"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                animationFillMode: 'both',
                color: `rgb(var(${rgbVar}) / var(--particle-core-opacity))`,
                background: 'currentColor',
                boxShadow: `0 0 ${particle.size * 5}px ${particle.size}px rgb(var(${rgbVar}) / var(--particle-glow-opacity))`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
