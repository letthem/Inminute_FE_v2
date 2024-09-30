/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F8',
        main: '#1BD7BE',
        mainBlack: '#2B2B2B',
        subBlack: '#212121',
        gray01: '#D9D9D9',
        gray02: '#A6A6A6',
        gray03: '#ECECEC',
        gray04: '#666666',
        gray05: '#BBBBBB',
        gray06: '#F2F2F2',
      },
      fontFamily: {
        nanum: ['"NanumSquare Neo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
