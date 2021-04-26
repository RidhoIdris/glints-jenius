module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor : {
        'main' : '#F5F7FC'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
