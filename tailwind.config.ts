import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#ccff00",
          hover: "#b8e600",
        },
        ink: {
          950: "#0a0a0b",
          900: "#0f0f11",
          850: "#131316",
          800: "#18181c",
          700: "#212126",
          600: "#2c2c33",
          500: "#3a3a42",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        accent: "0 0 0 1px rgba(204,255,0,0.4), 0 8px 24px -8px rgba(204,255,0,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
