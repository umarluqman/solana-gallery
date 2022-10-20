/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./gallery/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Code Pro", ...defaultTheme.fontFamily.sans],
      },
      rotate: {
        60: "60deg",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
