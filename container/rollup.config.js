import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;
if (production) {
  console.log('Production BUILD');
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default [
  {
    input: 'src/main.js',
    output: {
      sourcemap: true,
      name: 'app',
      file: 'public/bundle.js'
    },
    plugins: [
      svelte({
        compilerOptions: {
          customElement: true,
          // enable run-time checks when not in production
          dev: !production
        },
        preprocess: autoPreprocess({
          sourceMap: true
        })
      }),
      typescript({
        sourceMap: true,
        inlineSources: true
      }),
      copy({
        targets: [{ src: 'typings/**/*', dest: 'public' }],
        flatten: false
      }),
      (() => {
        return {
          name: 'dynamic-import-wp-ignore',
          resolveDynamicImport(specifier, importer) {
            const moduleInfo = this.getModuleInfo(importer);
            let index;
            for (index = specifier.start; index >= 0; index--) {
              if (moduleInfo.code.charAt(index) === '(') {
                break;
              }
            }
            if (
              moduleInfo.code
                .substr(index, specifier.end - index)
                .replace(/\s+/g, '')
                .includes('webpackIgnore:true')
            ) {
              return (
                '/* keepDynamicImport: true */' +
                moduleInfo.code.substr(specifier.start, specifier.end - specifier.start)
              );
            }
            return null;
          },
          renderDynamicImport({ customResolution }) {
            if (customResolution.indexOf('/* keepDynamicImport: true */') >= 0) {
              return {
                left: 'import(',
                right: ')'
              };
            }
            return null;
          }
        };
      })(),
      // we'll extract any component CSS out into
      // a separate file - better for performance
      // css({ output: 'bundle.css' }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload('public'),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production &&
        terser({
          format: {
            comments: '/.*webpackIgnore.*/'
          }
        })
    ],
    watch: {
      clearScreen: false
    }
  }
];
