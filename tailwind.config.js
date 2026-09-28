/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jitto: {
          navy: {
            DEFAULT: '#012D6C',
            50: '#F0F4FA',
            100: '#E1E9F5',
            200: '#C3D3EC',
            300: '#94B2DF',
            400: '#5C8CD0',
            500: '#2F67BD',
            600: '#1D4EA1',
            700: '#012D6C',
            800: '#09214D',
            900: '#061735',
            950: '#030C1C',
          },
          cyan: {
            DEFAULT: '#00C2CB',
            50: '#EDFDFE',
            100: '#D5F9FB',
            200: '#AEF1F5',
            300: '#75E5EC',
            400: '#32D1DC',
            500: '#00C2CB',
            600: '#039FA7',
            700: '#097E86',
            800: '#0F656C',
            900: '#11545A',
            950: '#05373C',
          }
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 194, 203, 0.4)',
        'glow-navy': '0 10px 30px -5px rgba(1, 45, 108, 0.3)',
      }
    },
  },
  plugins: [],
}
