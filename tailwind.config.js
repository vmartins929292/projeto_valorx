/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyan-950': '#083344',
        'cyan-900': '#0e7490',
        'cyan-800': '#155e75',
        'cyan-50': '#ecfeff',
        'teal-50': '#f0fdfa',
        'emerald-50': '#ecfdf5',
        'emerald-900': '#064e3b',
        'emerald-100': '#d1fae5',
        'emerald-800': '#065f46',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'montserrat-medium': ['Montserrat', 'sans-serif'],
        'montserrat-semibold': ['Montserrat', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

