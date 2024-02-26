import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // minify: false
  },

  plugins: [react()],
})
