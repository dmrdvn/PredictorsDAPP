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
      }
      
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('active', ['&:active', '&.router-link-active'])
    })
  ],
}

