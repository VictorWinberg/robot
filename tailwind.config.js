/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{elm,js}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgb(51, 153, 255)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(255, 136, 84)",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },
};
