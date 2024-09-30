/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F8',
        main01: '#E2F4F1',
        main02: '#D3F5F1',
        main03: '#BAEEE7',
        main04: '#1BD7BE',
        mainBlack: '#2B2B2B',
        subBlack: '#212121',
        black01: '#4D4D4D',
        gray01: '#F2F2F2',
        gray02: '#ECECEC',
        gray03: '#D9D9D9',
        gray04: '#BBBBBB',
        gray05: '#A6A6A6',
        gray06: '#666666',
        gray07: '#4D4D4D',
      },
      fontFamily: {
        nanum: ['"NanumSquare Neo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
