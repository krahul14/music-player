/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-800': '#2d3748',
        'gray-900': '#1a202c',
      },
    },
  },
  plugins: [],
}
