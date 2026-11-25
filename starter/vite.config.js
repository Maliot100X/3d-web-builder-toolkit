import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

// Multi-page: index + a piece detail page, so page transitions are real navigations.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: { index: resolve(import.meta.dirname, 'index.html'), piece: resolve(import.meta.dirname, 'piece.html') },
      output: { manualChunks: { motion: ['gsap', 'lenis'] } },
    },
  },
});
