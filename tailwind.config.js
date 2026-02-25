/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['David Libre', 'Georgia', 'serif'],
        sans: ['Assistant', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

