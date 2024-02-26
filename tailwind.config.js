/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        world: "url('bg-world.jpg')",
      },
      keyframes: {
        spin: {
          "0%": {
            transform: " rotateY(0)",
            opacity: 1,
          },
          "100%": { transform: "rotateY(360deg)", opacity: 0 },
        },
      },
      animation: {
        "button-spin": "spin 0.5s linear both",
        "wave-an": "wave 1s linear infinite",
      },
    },
  },
  plugins: [],
};
