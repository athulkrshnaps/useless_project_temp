/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f8f4',
          100: '#e1f0e6',
          200: '#c3e1cf',
          300: '#97caaF',
          400: '#64ad8a',
          500: '#3d906a',
          600: '#2c7353',
          700: '#235c43',
          800: '#1e4937',
          900: '#193d2e',
          950: '#0c2219',
        },
        savanna: {
          50: '#fdfbf7',
          100: '#f9f6ee',
          200: '#f2ecdc',
          300: '#e7dcbf',
          400: '#d7c49b',
          500: '#c5a975',
          600: '#b09059',
          700: '#8e7144',
          800: '#735b39',
          900: '#5f4b30',
        },
        peanut: {
          DEFAULT: '#d97706',
          light: '#fde68a',
          dark: '#92400e',
        },
        tusk: '#faf7f2',
        charcoal: '#181e1b',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(12, 34, 25, 0.08)',
        'glow': '0 0 25px rgba(61, 144, 106, 0.25)',
        'peanut-glow': '0 0 25px rgba(217, 119, 6, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
