import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rovers': {
        target: 'http://localhost:3000/api/v1',
        changeOrigin: true
      },
      '/file': {
        target: 'http://localhost:3000/api/v1',
        changeOrigin: true
      }
    }
  }
})
