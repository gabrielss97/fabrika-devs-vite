/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      md: '768px',
      // tablet

      lg: '1024px',
      // tablet grande e notebook pequeno

      xl: '1280px',
      // notebook

      '2xl': '1536px',
      // desktop
    },
    colors: {
      cWhite: '#ffffff',
      cGray: '#f5f5f5',
      cBlack: '#111111',
      cGreen: '#62b132',
      cBlue: '#2d6aa9',
    },
  },
  plugins: [],
};
