/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      s10: '1064px',
      s13: '1390px',
    },
    extend: {
      colors: {
        bg: '#F8F8F8',
        main01: '#E2F4F1',
        main02: '#D3F5F1',
        main03: '#BAEEE7',
        main04: '#85EADC',
        main05: '#4CDBC7',
        main06: '#1BD7BE',
        main07: '#16CBB3',
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
        pretendard: ['"Pretendard Variable"', 'sans-serif'],
      },
    },
  },
  plugins: [scrollbarHide, scrollbar],
};
