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
      backgroundImage: {
        "stat-gradient":
          "linear-gradient(141deg, #EB5231 -29.15%, #F97F78 62.33%, #FEA49E 151.64%)",
      },
    },
    fontFamily: {
      logo: ["Caveat", "cursive"],
      header: ["Poppins", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
    boxShadow: {
      "nav-shadow": "3px 0px 5px 0px rgba(0, 0, 0, 0.25)",
      "btn-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
    },
  },
  plugins: [],
};
