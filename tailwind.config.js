/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Assistant', 'Segoe UI', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'],
        display: ['Rubik', 'Assistant', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

