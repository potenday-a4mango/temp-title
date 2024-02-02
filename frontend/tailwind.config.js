module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // src 하위 파일 중 확장자가 .js,.jsx,.ts,.tsx인 파일을 대상으로 한다는 의미
  ],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '4px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
      'custom-s-radius': '5px',
      'custom-m-radius': '10px',
      'custom-l-radius': '16px',
    },
    container: {
      center: true,
      screens: {
        lg: '390px',
        xl: '390px',
        '2xl': '390px',
      },
    },
    extend: {
      minWidth: {
        'container-min': '390px',
      },
      fontSize: {
        xs: '11px',
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '20px',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        'custom-green': '#D0E933',
        'custom-black': '#404040',
        'custom-semi-black': '#585858',
        'custom-gray': '#A5A5A5',
        'custom-middle-gray': '#CBCBCB',
        'custom-light-gray': '#F5F5F5',
        'custom-bg-gray': '#424242',
      },
      width: {
        'custom-card-image': '165px',
      },
      height: {
        'custom-height-58': '58px',
        'custom-height-60': '60px',
        'custom-height-82': '82px',
      },
      size: {
        'custom-card-image': '165px',
        'custom-minicard-image': '80px',
      },
      spacing: {
        'custom-gap-5': '5px',
        'custom-gap-7': '7px',
        'custom-gap-20': '20px',
      },
      gridTemplateColumns: {
        'custom-grid-2': 'repeat(2, minmax(0, 185px))',
      },
    },
  },
  plugins: [],
};
