const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  mode: 'production',
  entry: {
    extendedConfiguration: './src/luigi-config/extended/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'static/luigi/')
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        "from": "node_modules/@kyma-project/luigi-core",
        "to": "luigi-core"
      },   
      {
        "from": "node_modules/@kyma-project/luigi-client",
        "to": "../luigi-client"
      },
      {
        "from": "node_modules/fiori-fundamentals/dist",
        "to": "../fundamental-ui"
      },
      {
        "from": "src/docs/assets",
        "to": "../assets"
      }
    ]),
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          rootMode: 'root'
        }
      }
    ]
  }
};
