import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: "#b61da3",
        secondary: "#8b037a",
        tertiary: "#d5a9cf",
        hover: "#6f506b",
        white: "#ffffff",
        error: "#ff4e00",
        nAllowed: "#dbd5d3",

        light: {
          primary: "#c7d2fe",
          secondary: "#a5b4fc",
          tertiary: "#eef2ff",
          hover: "#6d28d9",
        },

        dark: {
          primary: "#1e3a8a",
          secondary: "#1e40af",
          tertiary: "#1e2956",
          hover: "#3b82f6",
        },
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
    },
  },
  darkMode: 'class', // Enable dark mode via class
  plugins: [],
} satisfies Config;
