import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split out heavier dependencies to their own chunk
            if (id.includes('html2canvas')) return 'vendor-html2canvas';
            if (id.includes('fabric')) return 'vendor-fabric';
            if (id.includes('react-router-dom') || id.includes('react-router')) return 'vendor-react-router';
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('firebase')) return 'vendor-firebase';
            
            // All other node_modules into a generic vendor chunk
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
