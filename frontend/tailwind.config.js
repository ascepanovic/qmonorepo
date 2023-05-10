/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Krona One"', 'sans-serif']
    },
    colors: {
      'main-bg': '#2c3842',
      main: '#2AE78B'
    }
  },
  plugins: []
};
