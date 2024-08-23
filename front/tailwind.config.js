const { transform } = require("next/dist/build/swc");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
      },
      colors: {
        black: "#000000",
        dimGray: "#999999",
        grayBorder: "#DDDDDD",
        grayText: "#909090",
        grayBackground: "#F7F7F7",
        white: "#FFFFFF",
        lightgreen: "#80E5BA",
        green: "#00CB76",
        deepgreen: "#0BA263",
        red: "#EB4646",
        yellow: "#F6BE2C",
        orange: "#F6812C",
        blue: "#00A0FF",
        deepblue: "#0068FF",
        navy: "#000080",
      },
      animation: {
        "step-in": "stepIn 0.6s ease-in infinite alternate",
        "step-out": "stepOut 0.6s ease-in infinite alternate",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        "breathe-tongue": "breatheTongue 1.5s ease-in-out infinite",
      },
      keyframes: {
        stepIn: {
          "0%": { opacity: "100%", transform: "scale(1)" },
          "100%": { opacity: "30%", transform: "scale(0.95)" },
        },
        stepOut: {
          "0%": { opacity: "30%", transform: "scale(0.95)" },
          "100%": { opacity: "100%", transform: "scale(1)" },
        },
        heartbeat: {
          "0%": { transform: "scale(0.95)" },
          "10%": { transform: "scale(1)" },
          "20%": { transform: "scale(0.95)" },
          "30%": { transform: "scale(1)" },
          "40%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(0.95)" },
        },
        breatheTongue: {
          "0%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.8)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};
