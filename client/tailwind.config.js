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
      fontFace: {
        karla: [
          {
            filename: "./assets/fonts/karla/Karla-Medium",
            weigth: 400,
          },
        ],
        latoBlack: [
          {
            filename: "./assets/fonts/lato/Lato-Black",
            weigth: 900,
          },
        ],
        latoRegular: [
          {
            filename: "./assets/fonts/lato/Lato-Regular",
            weigth: 400,
          },
        ],
      },
      fontFamily: {
        karla: ["karla", "sans-serif"],
        latoBlack: ["latoBlack", "system-ui"],
        latoRegular: ["latoRegular", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        m: "2rem",
        l: "2.5rem",
        xl: "4rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [],
};
