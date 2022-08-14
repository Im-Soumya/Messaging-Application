/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        1.4: "6px",
        1.5: "7px",
        2.5: "10px",
        3.2: "14px",
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
};
