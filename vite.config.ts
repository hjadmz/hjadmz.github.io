
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // CRITICAL: Makes paths relative so assets load correctly on GitHub Pages
    base: './', 
  };
});
