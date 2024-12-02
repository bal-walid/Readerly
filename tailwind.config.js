/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1E90FF",
        primary: "#F5F5DC",
        "text-main": "#333333",
        "text-secondary": "#777777",
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
