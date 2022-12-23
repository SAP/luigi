const preprocess = require('svelte-preprocess');

const config = {
  extensions: ['.svelte'],
  compilerOptions: {
  },
  name: 'Luigi',
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      }
    })
  ]
};

module.exports = config;
