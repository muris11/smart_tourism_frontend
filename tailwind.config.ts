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
          DEFAULT: '#16a34a',
          dark: '#14532d',
          light: '#dcfce7',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}

export default config
