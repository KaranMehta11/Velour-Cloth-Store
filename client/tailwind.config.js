/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-cream': '#F5F0E8',
        'luxury-black': '#0A0A0A',
        'luxury-gold': '#B8963E',
        'luxury-gold-light': '#D4AF6A',
        'luxury-charcoal': '#1C1C1C',
        'luxury-muted': '#6B6560',
        'luxury-white': '#FDFCFA',
        'luxury-border': '#E8E0D0',
      },
      fontFamily: {
        'garamond-serif': ['"Cormorant Garamond"', 'serif'],
        'garamond-italic': ['"EB Garamond"', 'serif'],
        'sans': ['"Jost"', 'sans-serif'],
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}
