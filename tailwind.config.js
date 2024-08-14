/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        "shimmer": {
          "100%": {
            "transform": "translateX(100%)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.75s infinite"
      }
    },
    animation: {
      pulse: "pulse 1.75s infinite"
    }
  },

  corePlugins: {
    preflight: false
  },

  plugins: [],
}
