import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rosePink: '#F3507A',
        navy: '#001B3A',
        deepBlue: '#003366',
        skyBlue: '#3AB0E2',
        coral: '#F0543E',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;