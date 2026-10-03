/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#F0B429",
          500: "#D99E1E",
        },
      },
    },
  },
  plugins: [],
};
