/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
    },
  },
  plugins: [],
};
