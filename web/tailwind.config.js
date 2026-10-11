/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        da: {
          500: "#0D9488",
          600: "#0B7C72",
        },
      },
    },
  },
  plugins: [],
};
