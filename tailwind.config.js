/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "primary-50": "var(--color-neutral-50)",
        "primary-100": "var(--color-neutral-100)",
        "primary-200": "var(--color-neutral-200)",
        "primary-300": "var(--color-neutral-300)",
        "primary-400": "var(--color-neutral-400)",
        "primary-500": "var(--color-neutral-500)",
        "primary-600": "var(--color-neutral-600)",
        "primary-700": "var(--color-neutral-700)",
        "primary-800": "var(--color-neutral-800)",
        "primary-900": "var(--color-neutral-900)",
        "primary-950": "var(--color-neutral-950)",
      },
      // borderRadius: {
      //   DEFAULT: "0.25rem",
      //   "none": "0",
      //   "sm": "0.125rem",
      //   "lg": "0.5rem",
      // },
      transitionProperty: {
        bg: "background-color",
        translate: "translate"
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
