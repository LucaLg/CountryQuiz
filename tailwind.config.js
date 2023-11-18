/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": {
            transform: " rotateY(0)",
          },
          "50%": { transform: "rotateY(360deg)" },
          "80%": { transform: "scale(0.5)" },
          "100%": {
            transform: " scale(0)",
          },
        },
      },
      animation: {
        "button-spin": "spin 1s linear both",
        "wave-an": "wave 2s linear infinite",
      },
    },
  },
  plugins: [],
};
