import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
const execSync = require('child_process').execSync;

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

/**
 * This function replaces the '__luigi_dyn_import' string with 'import' to avoid bundlers 
 * resolving dynamic import statements as they shouldn't be resolved in this case
 * 
 * @param {string} bundleFileName the file name of the generated bundle js
 */
function replaceDynamicImport(bundleFilename) {
  const bundleSourceMapFileName = bundleFilename + '.map';
  const backupBundleFilename = bundleFilename + '.backup'
  const backupSourceMapFilename = bundleSourceMapFileName + '.backup';

  try {
    // sed can't work on both Linux + MAC without generating 'backup' files
    execSync(
      `sed -i.backup 's/__luigi_dyn_import/import/g' ${bundleFilename} &&
       sed -i.backup 's/__luigi_dyn_import/import/g' ${bundleSourceMapFileName}`
    );
  } catch (error) {
    console.error('Failed to replace string', error)
    if (error) { throw error };
  }

  try {
    // delete generated backup files as they are not needed
    execSync(
      `rm ${backupBundleFilename} ${backupSourceMapFilename}`
    );
  } catch (error) {
    console.error('Failed to delete backup generated files', error);
    if (error) { throw error };
  }

  console.log(
    '\x1b[33mRollup [' + new Date().toLocaleTimeString() + ']: ',
    '\x1b[0m',
    'Post-processing finished replacing __luigi_dyn_import --> import.'
  );
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
        sourceMap: true
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
      {
        writeBundle(bundle) {
          replaceDynamicImport(bundle.file)
        }
      },
      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload('public'),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
    watch: {
      clearScreen: false
    }
  }
];
