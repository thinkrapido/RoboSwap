/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      textShadow: {
        header: '0 0 3px rgba(255, 255, 255, .8), 0 0 15px rgba(255, 255, 100, .9)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
