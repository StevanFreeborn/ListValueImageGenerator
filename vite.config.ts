/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/ListValueImageGenerator/',
  test: {
    environment: 'jsdom',
    setupFiles: [],
    testNamePattern: './tests/**/*.spec.tsx',
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['html-spa', 'text', 'text-summary'],
    },
  },
});
