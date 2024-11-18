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
<<<<<<< HEAD
      external: [],
    },
  },
});
=======
      external: [
        '@fortawesome/fontawesome-free/css/all.min.css', // Explicitly externalize FontAwesome CSS
      ],
    },
  },
});
>>>>>>> 4c8602ac77d85c588ca67b8735d1eb8ef5219585
