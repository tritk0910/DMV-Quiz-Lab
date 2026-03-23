/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: '0.85rem',
        '2xl': '1.1rem'
      }
    }
  },
  plugins: []
}
