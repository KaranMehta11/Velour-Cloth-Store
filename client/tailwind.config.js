/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'velour-bg': '#F8F6F2',
        'velour-text': '#1A1A1A',
        'velour-accent': '#C9A96E',
        'velour-dark': '#111111',
        'velour-muted': '#6B6B6B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}
