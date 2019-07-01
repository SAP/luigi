const path = require('path');
const { readFileSync } = require('fs');

const babelSettings = JSON.parse(readFileSync('./../.babelrc'));

module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client.js',
    libraryExport: 'default',
    library: 'LuigiClient',
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
