import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  server: {
    port: 5000
  },

  resolve: {
    alias: {
      // "@src": path.resolve(__dirname, "./src")
      "@src": "/src",
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@lib": "/src/lib",
      "@services": "/src/services",
      "@heroicons/outline": "@heroicons/react/24/outline",
      "@heroicons/solid": "@heroicons/react/24/solid"
    }
  },

  css: {
    devSourcemap: true,
    transformer: "postcss",
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
  },

  plugins: [react()],
})
