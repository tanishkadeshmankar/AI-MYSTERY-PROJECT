/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mystery: {
          ink: '#020817',
          card: '#111827',
          gold: '#fbbf24',
          crimson: '#ef4444',
          teal: '#2dd4bf',
        },
      },
      boxShadow: {
        glow: '0 0 25px rgba(45, 212, 191, 0.25)',
      },
    },
  },
  plugins: [],
};
