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
          },
          "100%": { transform: "rotateY(360deg)" },
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
