/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "2.5xl": "1.6875rem", // This is the average of 1.5rem and 1.875rem
      },
      colors: {
        "theme-color": "#e10112",
        // "light-primary": "#e10112",
        primary: "#00008B",
        background: "#f2f2f2",
        "dark-primary": "#ffffff",
        "dark-bg": "#1a202c",
      },
    },
  },
};
