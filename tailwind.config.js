/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paper-white': '#F9FAFB',
        'misty-blue': '#8E9AAF',
        'lavender-mist': '#CBC0D3',
        'pink-blush': '#EFD3D7',
        dark: {
          bg: '#1a1a1e',
          card: '#23232a',
          text: '#e8e6e3',
          muted: '#a09c98',
          border: '#2e2e35',
        },
      },
    },
  },
  plugins: [],
}