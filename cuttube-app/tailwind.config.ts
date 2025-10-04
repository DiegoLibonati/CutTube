import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161616",
        secondary: "#F31B11",
        white: "#FFFFFF",
        black: "#000000",
        tinyBlack: "#323232",
      },
    },
  },
  plugins: [],
};

export default config;
