/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2148C0",
      },
      fontFamily: {
        dmsans: "'DM Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
