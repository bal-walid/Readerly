/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        main: '#1E90FF', // Example for blue
        primary: '#F5F5DC', // Example for beige
        'text-main': '#333333', // Example for main text
        'text-secondary': '#777777', // Example for secondary text
      },
    },
  },
  plugins: [],
}

