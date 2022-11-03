import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

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
      format: 'es',
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
        rootDir: './src/'
      }),
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
      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: `src/main.js`,
    plugins: [dts()],
    output: {
      file: `public/bundle.d.ts`,
      format: 'es',
      sourcemap: true
    },
    external: ['svelte', 'svelte/internal'],
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
        rootDir: './src/'
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs()
    ]
  }
];
