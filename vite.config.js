import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
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
      "@components": "/src/pages/_components",
      "@lib": "/src/lib",
      "@services": "/src/services",
      "@heroicons/outline": "@heroicons/react/24/outline",
      "@heroicons/solid": "@heroicons/react/24/solid"
    }
  },

  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer]
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    // cssMinify: "lightningcss"
    // cssMinify: false,
  },

  plugins: [
    react()
  ],
})
