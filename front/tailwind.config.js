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
        grayBorder: "#DDDDDD",
        grayText: "#909090",
        grayBackground: "#F7F7F7",
        white: "#FFFFFF",
        green: "#00CB76",
        deepgreen: "#0BA263",
        yellow: "#FFC700",
        orange: "#FF4E00",
      },
      animation: {
        "step-in": "stepIn 0.6s ease-in infinite alternate",
        "step-out": "stepOut 0.6s ease-in infinite alternate",
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
      },
    },
  },
  plugins: [],
};
