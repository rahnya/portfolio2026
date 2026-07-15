import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#183153",
        dark: "#373750",
        "deep-dark": "#0D1B2A",
        pink: {
          DEFAULT: "#FF96B3",
          vivid: "#FF3B8D",
          light: "#FFB6CB",
        },
        purple: "#8A6F9B",
        yellow: "#FFC72C",

        cream: "#F5EBD9",
        peach: "#E8D2C3",

        // Accents mode clair (foncés pour contraste sur cream)
        rose:    { DEFAULT: "#B03A50", light: "#C9556A" },
        copper:  { DEFAULT: "#A05F2A", light: "#B8763F" },
        gold:    { DEFAULT: "#8F6A1E", light: "#B08327" },
        plum:    { DEFAULT: "#6E4A5D", light: "#8B6079" },

        text: {
          primary:   "#2B0F16",
          secondary: "#4A2329",
          muted:     "#7A4F55",
        },

        snoozly: {
          navy:   "#1F3450",
          copper: "#C97B4A",
          cream:  "#F4ECDF",
          sage:   "#A4B89F",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      fontSize: {
        "hero":   ["clamp(3rem, 8vw, 6.5rem)",   { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "huge":   ["clamp(2.25rem, 5vw, 4rem)",  { lineHeight: "1.05", letterSpacing: "0.01em" }],
        "big":    ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1",  letterSpacing: "0.01em" }],
      },
      letterSpacing: {
        "widest-2": "0.24em",
        "widest-3": "0.32em",
      },
      boxShadow: {
        "soft":    "0 2px 12px rgba(43, 15, 22, 0.06)",
        "soft-lg": "0 20px 50px rgba(43, 15, 22, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
