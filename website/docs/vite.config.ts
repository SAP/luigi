import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit()
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'build/docs/*',
    //       dest: '../public/docs'
    //     }
    //   ]
    // })
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  build: {
    chunkSizeWarningLimit: 900000
    // rollupOptions: {
    //   external: ['src/data/docs']
    // }
  }
});
