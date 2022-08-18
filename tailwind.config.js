/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        300: "300px",
      },
      maxWidth: {
        15: "60px",
        350: "350px",
      },
      minHeight: {
        68: "72vh",
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        18: "70px",
        89: "89vh",
      },
      padding: {
        1.4: "6px",
        1.5: "7px",
        2.5: "10px",
        3.2: "14px",
      },
      fontSize: {
        xxs: "9px",
      },
      zIndex: {
        1: "1",
        100: "100px",
      },
    },
  },
  plugins: [],
};
