import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@fortawesome/fontawesome-free/css/all.min.css', // Explicitly externalize FontAwesome CSS
      ],
    },
  },
});
