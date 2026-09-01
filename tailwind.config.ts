import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF6EE',
          dark: '#FDFBF7'
        },
        'dark-green': {
          DEFAULT: '#1B3B2B',
          hover: '#132B1F'
        },
        'sage-green': {
          DEFAULT: '#4E6E58',
          light: '#8FA391'
        },
        'warm-gold': {
          DEFAULT: '#C5A059',
          light: '#E2C275'
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;