/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dost: {
          dark: "#096B68",
          medium: "#129990",
          light: "#90D1CA",
          bg: "#FFFBDE",
        },
      },
    },
  },
  plugins: [],
};