import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './data/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        faint: 'rgb(var(--color-faint) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--color-accent-2) / <alpha-value>)',
        'on-accent': 'rgb(var(--color-on-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bangla: ['var(--font-bangla)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: 'var(--content-width)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
        chip: 'var(--radius-chip)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        glow: 'var(--shadow-glow)',
        pill: 'var(--shadow-pill)',
      },
      spacing: {
        content: 'var(--content-width)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(100deg, rgb(var(--color-accent)), rgb(var(--color-accent-2)))',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'code-drift': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-25%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -18px, 0) rotate(6deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        },
        'particle-drift': {
          '0%': { opacity: '0', transform: 'translate3d(0, 0, 0) scale(0.6)' },
          '15%': { opacity: '0.9' },
          '50%': {
            opacity: '0.6',
            transform: 'translate3d(18px, -26px, 0) scale(1)',
          },
          '85%': { opacity: '0.9' },
          '100%': {
            opacity: '0',
            transform: 'translate3d(36px, -52px, 0) scale(0.6)',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'code-drift': 'code-drift var(--code-drift-duration, 70s) linear infinite',
        'float-slow': 'float-slow var(--symbol-float-duration, 14s) ease-in-out infinite',
        'pulse-glow': 'pulse-glow 12s ease-in-out infinite',
        'particle-drift': 'particle-drift 14s ease-in-out infinite',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
