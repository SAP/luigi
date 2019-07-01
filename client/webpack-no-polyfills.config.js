const path = require('path');
const { readFileSync } = require('fs');

const babelSettings = JSON.parse(readFileSync('./.babelrc-no-polyfills'));

module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client-no-polyfills.js',
    libraryExport: 'default',
    library: 'LuigiClientNoPollyfills',
    libraryTarget: 'umd',
    path: path.resolve(__dirname)
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
