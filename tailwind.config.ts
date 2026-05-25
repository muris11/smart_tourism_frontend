import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6f3',
          100: '#dcedf0',
          500: '#0d7a6a',
          600: '#0a6458',
          700: '#08534a',
          900: '#06433c',
        },
        brand: {
          DEFAULT: '#0d7a6a',
          dark: '#0a6458',
          light: '#eef6f3',
          deep: '#1c1917',
          warm: '#d4813a',
          warmLight: '#fef4ec',
          brown: '#8B5E3C',
          pale: '#f6f1eb',
          cream: '#faf5ef',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(28,25,23,0.06), 0 4px 12px rgba(28,25,23,0.04)',
        'card-hover': '0 4px 16px rgba(28,25,23,0.08), 0 12px 32px rgba(28,25,23,0.06)',
        elevated: '0 8px 32px rgba(28,25,23,0.1), 0 24px 48px rgba(28,25,23,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
