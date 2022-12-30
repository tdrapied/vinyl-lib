const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      primary: {
        DEFAULT: "#7688e8",
        light: "rgba(118,136,232,0.15)",
      },
      secondary: "#f9f9f9",
      white: {
        DEFAULT: "#ffffff",
        dark: "#f8f7fa",
      },
      black: "#0d0b0d",
      gray: colors.gray,
      red: colors.red,
    },
  },
};
