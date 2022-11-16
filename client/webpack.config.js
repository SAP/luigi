const path = require('path');
const { readFileSync } = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client.js',
    libraryExport: 'default',
    library: 'LuigiClient',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'luigi-client.d.ts',
        to: '.'
      },
      {
        from: 'src/luigi-element.js',
        to: '.'
      }
    ])
  ],
  devtool: 'source-map'
};
