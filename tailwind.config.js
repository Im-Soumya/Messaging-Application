/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      height: {
        18: "70px",
      },
      padding: {
        1.4: "6px",
        1.5: "7px",
        2.5: "10px",
        3.2: "14px",
      },
      zIndex: {
        1: "1",
        100: "100px",
      },
    },
  },
  plugins: [],
};
