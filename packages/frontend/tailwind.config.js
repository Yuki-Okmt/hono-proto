/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        notion: {
          bg: '#ffffff',
          'bg-dark': '#191919',
          'bg-secondary': '#f7f6f3',
          'bg-secondary-dark': '#202020',
          'bg-hover': '#f1f1ef',
          'bg-hover-dark': '#2f2f2f',
          text: '#37352f',
          'text-dark': '#ffffff',
          'text-secondary': '#787774',
          'text-secondary-dark': '#9b9a97',
          border: '#e9e9e7',
          'border-dark': '#373737',
          blue: '#2383e2',
          red: '#e03e3e',
          green: '#0f7b0f',
          yellow: '#d9730d',
          purple: '#9a6dd7',
          pink: '#ad1a72',
          orange: '#d9730d',
          gray: '#9b9a97',
        }
      },
      fontFamily: {
        'notion': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'notion': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'notion-hover': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'notion-dark': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'notion-hover-dark': '0 2px 8px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'notion': '6px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};