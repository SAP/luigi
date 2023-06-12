import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import json from '@rollup/plugin-json';

export default defineConfig({
  plugins: [sveltekit(), json()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  build: {
    chunkSizeWarningLimit: 900000
  }
});
