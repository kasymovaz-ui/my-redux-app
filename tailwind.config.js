/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',     // indigo-500
        accent: '#a855f7',      // purple-500
      },
    },
  },
  plugins: [],
}