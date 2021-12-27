module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'sm-max': {'max':'640px'},
      'md': '768px',
      'md-max': {'max':'768px'},
      'lg': '1024px',
      'lg-max': {'max':'1024px'},
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
