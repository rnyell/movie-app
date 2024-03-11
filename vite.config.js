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
      "@styles": "/src/styles",
      "@heroicons": "@heroicons/react/24/outline"
    }
  },

  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssMinify: false,
  },

  plugins: [
    react()
  ],
})
