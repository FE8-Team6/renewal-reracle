/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        purpleDark: "var(--color-purple-dark)",
        grayDark: "var(--color-gray-dark)",
        grayLight: "var(--color-gray-light)",
        white: "var(--color-white)",
        pink: "var(--color-pink)",
        pinkLight: "var(--color-pink-light)",
      },
      fontSize: {
        "display-lg": "66px",
        "display-lg-m": "40px",
        "display-base": "50px",
        "display-base-m": "32px",
        "display-sm": "40px",
        "display-sm-m": "25px",
        "heading-lg": "50px",
        "heading-lg-m": "40px",
        "heading-base": "40px",
        "heading-base-m": "32px",
        "heading-sm": "32px",
        "heading-sm-m": "25px",
        "title-2xl": "32px",
        "title-2xl-m": "25px",
        "title-xl": "25px",
        "title-xl-m": "25px",
        "title-lg": "21px",
        "title-lg-m": "21px",
        "title-base": "19px",
        "title-base-m": "19px",
        "title-sm": "17px",
        "title-sm-m": "17px",
        "title-xs": "15px",
        "title-xs-m": "15px",
        "body-lg": "19px",
        "body-base": "17px",
        "body-base-m": "17px",
        "body-sm": "15px",
        "body-sm-m": "15px",
        "detail-lg": "17px",
        "detail-lg-m": "17px",
        "detail-base": "15px",
        "detail-base-m": "15px",
        "detail-sm": "13px",
        "detail-sm-m": "13px",
        "label-lg": "19px",
        "label-lg-m": "19px",
        "label-base": "17px",
        "label-base-m": "17px",
        "label-sm": "15px",
        "label-sm-m": "15px",
        "label-xs": "13px",
        "label-xs-m": "13px",
        "links-lg": "19px",
        "links-lg-m": "19px",
        "links-base": "17px",
        "links-base-m": "17px",
        "links-sm": "15px",
        "links-sm-m": "15px",
      },
      borderRadius: {
        0: "0px",
        1: "2px",
        2: "4px",
        3: "6px",
        4: "8px",
        5: "12px",
        6: "16px",
        7: "20px",
        8: "24px",
        9: "32px",
        10: "1000px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
