const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');
const preprocess = require('svelte-preprocess');

const variablePath = resolve(__dirname, 'src/styles', 'variables');
const variableUrl = pathToFileURL(variablePath);

const config = {
  extensions: ['.svelte'],
  compilerOptions: {
  },
  name: 'Luigi',
  preprocess: [
    preprocess({
      scss: {
        prependData: `@use "${variableUrl}";`
      }
    })
  ]
};

module.exports = config;
