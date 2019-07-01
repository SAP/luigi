const path = require('path');
const { readFileSync } = require('fs');

const babelSettings = JSON.parse(readFileSync('./.babelrc-ie11'));

module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client-ie11.js',
    libraryExport: 'default',
    library: 'LuigiClientIe11',
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
