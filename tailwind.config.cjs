/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#F8F8F9',
      secondary: '#e4e4e7',
      blue: '#0284c7',
      dark: '#334155',
      slate: '#9ca3af',
      lightgray:'#e5e7eb',
      darkgray: '#9ca3af',
      red: '#f87171',
      yellow: '#eab308',
      done: '#01AD93',
      pending: '#FD7D7C',
      working: '#F3D088',


    },
    extend: {},
  },
  plugins: [],
}
