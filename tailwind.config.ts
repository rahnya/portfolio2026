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
        // Couleurs mode sombre — rose adouci par défaut (#FF96B3 au lieu de #FF3B8D)
        navy: "#183153",
        dark: "#373750",
        pink: {
          DEFAULT: "#FF96B3",   // rose clair par défaut (avant #FF3B8D, trop vif)
          vivid: "#FF3B8D",     // accent vif disponible si besoin (boutons CTA dark)
          light: "#FFB6CB",
          muted: "#D0A8BC",
        },
        purple: "#8A6F9B",
        yellow: "#FFC72C",
        "deep-dark": "#0D1B2A",

        // Couleurs mode clair (sunset) — alignées sur le PDF portfolio
        sunset: {
          pink: "#F4ADAE",
          orange: "#E8AC95",
          peach: "#F5C794",
          purple: "#B888A0",
          blue: "#9DA9BC",
        },

        // Texte mode clair — marron foncé d'appui
        text: {
          primary: "#3A1B22",
          secondary: "#5B333A",
          muted: "#7F4C53",
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