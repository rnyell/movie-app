/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // borderRadius: {
      //   DEFAULT: "0.25rem",
      //   "none": "0",
      //   "sm": "0.125rem",
      //   "lg": "0.5rem",
      // },
      transitionProperty: {
        bg: "background-color"
      },
      transitionDuration: {
        "135": "135ms",
      },
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
