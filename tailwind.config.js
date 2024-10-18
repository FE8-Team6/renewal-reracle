/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "var(--color-yellow)",
        red: "var(--color-red)",
        yellowLight: "var(--color-yellow-light)",
        green: "var(--color-green)",
        greenLight: "var(--color-green-light)",
        purple: "var(--color-purple)",
        purpleLight: "var(--color-purple-light)",
        grayDark: "var(--color-gray-dark)",
        grayLight: "var(--color-gray-light)",
        white: "var(--color-white)",
      },
    },
  },
  plugins: [],
};
