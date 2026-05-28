/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#f7f7f7',
        dark: {
          DEFAULT: '#050505',
          light: '#0d0d0d',
        },
        accent: '#ff1f2d',
        text: {
          primary: '#111111',
          secondary: '#666666',
        },
        border: '#e8e8e8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
