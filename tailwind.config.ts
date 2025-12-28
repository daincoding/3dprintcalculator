import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          main: 'rgb(var(--bg-main))',
          surface: 'rgb(var(--bg-surface))',
          elevated: 'rgb(var(--bg-elevated))',
        },
        text: {
          primary: 'rgb(var(--text-primary))',
          muted: 'rgb(var(--text-muted))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          strong: 'rgb(var(--accent-strong))',
        },
        success: 'rgb(var(--success))',
        warning: 'rgb(var(--warning))',
        danger: 'rgb(var(--danger))',
      },
      boxShadow: {
        glow: '0 0 12px rgb(var(--accent) / 0.35)',
        glowStrong: '0 0 20px rgb(var(--accent-strong) / 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;