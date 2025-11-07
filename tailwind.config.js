/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'dark-gold': '#B8860B',
        'nature-green': '#22c55e',
        'deep-green': '#15803d',
        'forest': '#064e3b',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.6)',
        'glow-green-lg': '0 0 40px rgba(34, 197, 94, 0.8)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.6)',
        'glow-gold-lg': '0 0 40px rgba(255, 215, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
