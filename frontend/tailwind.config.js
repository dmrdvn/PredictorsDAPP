/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '1px -6px 37px 6px rgba(12,18,26,0.50)', // Özel gölge sınıfı
      },
      fontFamily: {
        roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans]
      },
      color : {
        'primary-dark' : '#212f48',
        'secondary-dark' : '#F0F0F0',
        'bg-dark': '#152033',
        'light' : '#FFFFFF',
        'dark' : '#000000',
        'danger' : '#FF0000',
        'success' : '#00FF00',
        'warning' : '#FFFF00',
        'info' : '#00FFFF',
        'transparent' : 'transparent',
        'current' : 'currentColor',
        'pink': '#fa00a5',
      },
      
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('active', ['&:active', '&.router-link-active'])
    })
  ],
}
