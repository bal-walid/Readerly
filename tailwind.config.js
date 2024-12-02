/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F27851",
        primary: "#F8F1E7",
        "text-main": "#333333",
        "text-secondary": "#606060",
      },
    },
    fontFamily: {
      logo: ["Caveat", "cursive"],
      header: ["Poppins", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
