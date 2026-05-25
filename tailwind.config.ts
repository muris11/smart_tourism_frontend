import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        brand: {
          DEFAULT: '#0f766e',
          dark: '#115e59',
          light: '#ecfdf5',
          deep: '#1a1f2e',
          warm: '#b45309',
          warmLight: '#fffbeb',
          brown: '#8B5E3C',
          pale: '#f5efe8',
          cream: '#faf7f2',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(26,31,46,0.06), 0 4px 12px rgba(26,31,46,0.04)',
        'card-hover': '0 4px 16px rgba(26,31,46,0.08), 0 12px 32px rgba(26,31,46,0.06)',
        elevated: '0 8px 32px rgba(26,31,46,0.1), 0 24px 48px rgba(26,31,46,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
