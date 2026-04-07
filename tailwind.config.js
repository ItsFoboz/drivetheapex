/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'dta-black': '#0E0E0E',
        'dta-surface': '#161616',
        'dta-card': '#1E1E1E',
        'dta-red': '#CE4F37',
        'dta-red-hover': '#D95C42',
        'dta-white': '#E0DDD6',
        'dta-muted': '#888580',
        'dta-subtle': '#3A3A3A',
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        badge: '2px',
        btn: '4px',
        card: '6px',
        modal: '10px',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'pulse-dot': 'pulse-dot 1.8s ease-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
        'bounce-chevron': 'bounce-chevron 1.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'bounce-chevron': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
