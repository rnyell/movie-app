// import path from "path"
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
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@styles": "/src/styles",
      "@heroicons/outline": "@heroicons/react/24/outline",
      "@heroicons/solid": "@heroicons/react/24/solid"
    }
  },

  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer]
    }
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    // cssMinify: false,
  },

  plugins: [
    react()
  ],
})
