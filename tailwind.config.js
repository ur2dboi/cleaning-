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
            800: '#081D42',
            900: '#061633',
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
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(0, 194, 203, 0.45)',
        'glow-navy': '0 10px 40px -10px rgba(1, 45, 108, 0.4)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 8px 10px -4px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
