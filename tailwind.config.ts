import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark-first palette: "paper" is background (dark), "ink" is text (light)
        ink: {
          // Light neutrals for text on dark surfaces
          900: '#E6ECF5',
          800: '#C9D3E3',
          700: '#9EACC2',
        },
        paper: {
          // Deep, modern blue‑black surfaces
          50: '#0B1020',
          100: '#0F172A',
        },
        cyan: {
          spark: '#22D3EE',
          deep: '#0E7490',
        },
        violet: {
          spark: '#A78BFA',
          deep: '#6D28D9',
        },
        fuchsia: {
          spark: '#E879F9',
          deep: '#A21CAF',
        },
        lime: {
          spark: '#A3E635',
          deep: '#4D7C0F',
        },
        teal: {
          spark: '#2DD4BF',
          deep: '#0F766E',
        },
        orange: {
          spark: '#FB923C',
          deep: '#C2410C',
        },
        amber: {
          glow: '#FBBF24',
          deep: '#B45309',
        },
        rose: {
          pulse: '#FB7185',
          deep: '#BE123C',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.35)', opacity: '0.7' },
        },
        'logo-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.5px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-down': 'fade-down 0.6s ease-out both',
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
        'logo-float': 'logo-float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
