/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderRadius: {
      DEFAULT: "0 3rem 3rem 3rem",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        green: { DEFAULT: "#84A59D", dark: "#578076" },
        orange: "#F6CDAF",
        cream: "#F5F2E1",
        darkBlue: "#23272D",
        red: "#E91616",
      },
      fontFamily: {
        karla: ["Karla Medium", "sans-serif"],
        latoBlack: ["Lato Black", "system-ui"],
        latoRegular: ["Lato Regular", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        m: "2rem",
        l: "2.5rem",
        xl: "4rem",
      },
      dropShadow: {
        l: "0.2rem 0.2rem 0 theme('colors.orange')",
        xl: "0.30rem 0.30rem 0 theme('colors.orange')",
      },
      boxShadow: {
        DEFAULT: "0.5rem 0.5rem 0 theme('colors.orange')",
      },
    },
  },
  plugins: [],
};
