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
          "50%": { transform: "rotateY(180deg)" },
          "100%": {
            transform: " rotateY(360deg)",
          },
        },
      },
      animation: {
        "button-spin": "spin 0.5s linear both",
        "wave-an": "wave 2s linear infinite",
      },
    },
  },
  plugins: [],
};
