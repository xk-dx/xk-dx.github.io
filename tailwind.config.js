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
      },
    },
  },
  plugins: [],
}