/** @type {import('tailwindcss').Config} */
const colors = require('./src/theme/colors')

module.exports = {
  content: ['./src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
}
