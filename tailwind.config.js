/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": "Work Sans",
      },
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
        89: "80vh",
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
      colors: {
        "vampire-black": "#050509",
        "cetacean-blue-1": "#04052e",
        "cetacean-blue-2": "#140152",
        "royal-brown": "#56382e",
        "space-cadet": "#170e5f",
        "davy-gray": "#575353",
        "dark-slate-blue": "#00b4d8",
        "spicy-mix": "#97584d",
        cinereous: "#92837C",
        "silver-chalice": "#b0acae",
      },
    },
  },
  plugins: [],
};
