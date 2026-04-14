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
        // Couleurs mode sombre
        navy: "#183153",
        dark: "#373750",
        pink: {
          DEFAULT: "#FF3B8D",
          light: "#FF96B3",
          muted: "#D0A8BC",
        },
        purple: "#8A6F9B",
        yellow: "#FFC72C",
        "deep-dark": "#0D1B2A",
        
        // Couleurs mode clair (sunset)
        sunset: {
          pink: "#EF9C9E",
          orange: "#F9B97C",
          purple: "#B888A0",
          blue: "#99AABB",
        },
        
        // Texte
        text: {
          primary: "#5B333A",
          secondary: "#8B5F63",
          muted: "#A67D7F",
        },
      },
      
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "sunset": "linear-gradient(180deg, #FFB5B1 0%, #EF9C9E 10%, #B888A0 50%, #99AABB 100%)",
      },
      
      boxShadow: {
        "sunset": "0 4px 16px rgba(249, 185, 124, 0.12)",
        "sunset-lg": "0 8px 32px rgba(249, 185, 124, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;