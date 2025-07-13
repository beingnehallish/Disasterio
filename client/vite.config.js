import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/api': 'http://localhost:5000',
  },
    // This is important for refreshing deep routes like /resources
    historyApiFallback: true,
  }
});
