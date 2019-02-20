const path = require('path');
const webpack = require('webpack');

module.exports = {
  watch: false,
  mode: 'production',
  entry: {
    extendedConfiguration: './src/luigi-config/extended/main.js',
    basicConfiguration: './src/luigi-config/basic/basicConfiguration.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/assets')
  },
  plugins: [
    new webpack.BannerPlugin(
      `
      Don't be afraid!
      This file was generated automatically and you should not modify it.
      The documentation (located in /docs) will tell you how to modify Luigi configuration with pleasure.
      `
    )
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          rootMode: 'root'
        }
      }
    ]
  }
};
