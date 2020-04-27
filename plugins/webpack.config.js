const path = require('path');
const fs = require('fs');
const glob = require('glob');
const merge = require('lodash.merge');

const { readFileSync } = require('fs');

const babelSettings = JSON.parse(readFileSync('.babelrc'));

const config = {
  entry: glob.sync('./auth/**/index.js').reduce((acc, path) => {
    const entry = path.replace('/index.js', '').replace('./auth/src/', '');
    acc[entry] = path;
    return acc;
  }, {}),

  output: {
    filename: './[name]/plugin.js',
    libraryExport: 'default',
    library: 'LuigiPlugin-[name]',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'auth', 'public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelSettings
        }
      }
    ]
  }
};

// Extend with custom webpack configuration:
glob.sync('./auth/**/webpack-extra.config.js').forEach(path => {
  merge(config, require(path));
});

module.exports = config;
