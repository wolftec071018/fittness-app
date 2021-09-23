const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./src/**/*.{js,jsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
    
          black: colors.black,
          white: colors.white,
          gray: colors.gray,
          red: colors.red,
          yellow: colors.amber,
          green: colors.emerald,
          blue: colors.blue,
          indigo: colors.indigo,
          purple: colors.violet,
          pink: colors.pink,
        },
        extend: {
          colors: {
            mywhite: {
              '50': '#fffefe', 
              '100': '#fefefd', 
              '200': '#fdfcfa', 
              '300': '#fcfbf7', 
              '400': '#f9f7f0', 
              '500': '#f7f4ea', 
              '600': '#dedcd3', 
              '700': '#b9b7b0', 
              '800': '#94928c', 
              '900': '#797873'
          }, 
          mygray: {
            '50': '#fdfdfe', 
            '100': '#fcfbfc', 
            '200': '#f7f6f8', 
            '300': '#f2f0f3', 
            '400': '#e8e4eb', 
            '500': '#ded9e2', 
            '600': '#c8c3cb', 
            '700': '#a7a3aa', 
            '800': '#858288', 
            '900': '#6d6a6f'
        }, 
        mypurple: {
          '50': '#fcfcfd', 
          '100': '#f9f8fc', 
          '200': '#efeef7', 
          '300': '#e6e3f1', 
          '400': '#d3cee7', 
          '500': '#c0b9dd', 
          '600': '#ada7c7', 
          '700': '#908ba6', 
          '800': '#736f85', 
          '900': '#5e5b6c'
      },
        myblue: {
          '50': '#f9fafd', 
          '100': '#f2f6fb', 
          '200': '#dfe8f4', 
          '300': '#ccd9ee', 
          '400': '#a6bde1', 
          '500': '#80a1d4', 
          '600': '#7391bf', 
          '700': '#60799f', 
          '800': '#4d617f', 
          '900': '#3f4f68'
      },
      mygreen: {
        '50': '#f8fcfc', 
        '100': '#f1fafa', 
        '200': '#ddf2f1', 
        '300': '#c8e9e9', 
        '400': '#9ed9d9', 
        '500': '#75c9c8', 
        '600': '#69b5b4', 
        '700': '#589796', 
        '800': '#467978', 
        '900': '#396262'
  }
          }
        },
      },
      variants: {
        extend: {
          opacity: ['disabled'],
          cursor: ['disabled'],
          textColor: ['disabled'],
          backgroundColor: ['disabled'],
        },
      },
    
    plugins: [],
  };
  