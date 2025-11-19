import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5016',
          dark: '#1A3009',
          medium: '#4A7C2C',
          light: '#6BAE46',
        },
        verde: {
          50: '#f0f7ed',
          100: '#dcecd4',
          200: '#b9d9a9',
          300: '#92c279',
          400: '#6BAE46',
          500: '#4A7C2C',
          600: '#2D5016',
          700: '#234013',
          800: '#1A3009',
          900: '#122005',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
