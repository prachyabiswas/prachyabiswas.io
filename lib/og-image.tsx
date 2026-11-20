import { ImageResponse } from 'next/og';

/** Shared generated social image for home and article pages. */
export function createOgImage({
  title,
  subtitle,
  monogram,
  domain,
}: {
  title: string;
  subtitle: string;
  monogram: string;
  domain: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#08090e',
          color: '#f5f7ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: 999,
            background: 'rgba(96, 165, 250, 0.25)',
            filter: 'blur(90px)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: 999,
            background: 'rgba(232, 121, 249, 0.2)',
            filter: 'blur(90px)',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 54,
              height: 54,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(100deg, #60a5fa, #e879f9)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {monogram}
          </div>
          <div style={{ fontSize: 24, letterSpacing: 2, color: '#9ea3b8' }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 38,
              background: 'linear-gradient(100deg, #60a5fa, #e879f9)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ fontSize: 22, color: '#9ea3b8' }}>
          {domain}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
