/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', 'Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        safe: {
          DEFAULT: '#15803d',
          bg: '#dcfce7',
          border: '#86efac',
          text: '#14532d',
        },
        caution: {
          DEFAULT: '#ca8a04',
          bg: '#fef9c3',
          border: '#fde047',
          text: '#713f12',
        },
        danger: {
          DEFAULT: '#dc2626',
          bg: '#fee2e2',
          border: '#fca5a5',
          text: '#7f1d1d',
        },
        ink: {
          900: '#0f172a',
          600: '#475569',
          400: '#94a3b8',
        }
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.06), 0 8px 24px -12px rgba(15,23,42,.18)',
        pop: '0 12px 40px -12px rgba(15,23,42,.35)',
      },
      borderRadius: {
        xl2: '1rem',
      }
    },
  },
  plugins: [],
}
