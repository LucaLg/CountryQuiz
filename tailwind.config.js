/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        world: "url('bg-world.jpg')",
      },
      keyframes: {
        buttonOut: {
          "20%": {
            transform: "scale3d(0.9, 0.9, 0.9)",
          },
          "50%,55%": {
            opacity: "1",
            transform: "scale3d(1.1, 1.1, 1.1)",
          },
          to: {
            opacity: "0",
            transform: "scale3d(0.4, 0.4, 0.4)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "button-out": "buttonOut 0.75s linear both",
        "wave-an": "wave 1s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
