import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as csstree from 'css-tree';
import * as fs from 'fs';

const luigiPlugin = () => {
  return {
    enforce: 'pre',
    name: 'luigi-postprocess',
    generateBundle: (options, bundle) => {
      const cssFile = bundle['luigi.css'];
      cssFile.source = cssFile.source.replace(/(\.svelte-[a-z0-9]+){2,}/g, match => {
        const singleHash = match.match(/\.svelte-[a-z0-9]+/g)[0];
        return singleHash;
      });

      const jsFile = bundle['luigi.js'];
      jsFile.code = jsFile.code.replace('__luigi_dyn_import', 'import');

      // parse css and extract custom properties into dedicated file
      const cssVarArray = [];
      const ast = csstree.parse(cssFile.source);
      csstree.walk(ast, node => {
        if (node.type === 'Declaration' && node.property.startsWith('--')) {
          cssVarArray.push(node.property.substring(2));
        }
      });
      fs.writeFileSync('./public/luigi_theme_vars.js', 'window.__luigiThemeVars=' + JSON.stringify(cssVarArray) + ';');
    }
  };
};

export default defineConfig({
  assetsInclude: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
  base: '',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'luigi.js',
        format: 'es',
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('main.css')) {
            return 'luigi.css';
          }
          return '[name]-[hash][extname]';
        }
      },
      plugins: []
    },
    outDir: 'public'
  },
  publicDir: 'public_root',
  plugins: [luigiPlugin(), svelte()]
});
