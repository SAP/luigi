import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const luigiPlugin = () => {
  return {
    enforce: 'pre',
    name: 'luigi-postprocess',
    generateBundle: (options, bundle) => {
      const cssFile = bundle['luigi.css'];
      cssFile.source = cssFile.source.replace(/(\.svelte-[a-z0-9]+){2,}/g, match => {
        const singleHash = match.match(/\.svelte-[a-z0-9]+/g)[0];
        // console.log(match, singleHash);
        return singleHash;
      });
      // console.log(bundle);

      const jsFile = bundle['luigi.js'];
      jsFile.code = jsFile.code.replace('__luigi_dyn_import', 'import');
    }
  };
};

export default defineConfig({
  assetsInclude: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
  base: '',
  build: {
    watch: {},
    sourcemap: true,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'luigi.js',
        format: 'cjs',
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('main.css')) {
            return 'luigi.css';
          }
          return '[name]-[hash][extname]';
        }
      },
      plugins: []
    }
  },

  publicDir: false,
  plugins: [luigiPlugin(), svelte()]
});
