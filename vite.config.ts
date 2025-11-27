import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Vite config with React + TypeScript, serving on port 3000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  }
});


