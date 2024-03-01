// import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5000
  },

  resolve: {
    alias: {
      // "@src": path.resolve(__dirname, './src')
      '@src': '/src',
      '@styles': '/src/styles',
    }
  },

  // css: {
  //   postcss: {
  //     plugins: [require('autoprefixer')]
  //   }
  // },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  plugins: [react()],
})
