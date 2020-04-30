const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    ),

    new CopyWebpackPlugin([
      // idpProvider OAuth2 callback asset
      {
        from: 'node_modules/@luigi-project/plugin-auth-oauth2/callback.html',
        to: path.resolve(__dirname, 'src/assets') + '/auth-oauth2/'
      },
      // idpProvider OIDC assets
      {
        from: 'node_modules/@luigi-project/plugin-auth-oidc',
        to: path.resolve(__dirname, 'src/assets') + '/auth-oidc/'
      },
      // DOCSEARCH algolia
      {
        from: 'node_modules/docsearch.js/dist/cdn/docsearch.min.css',
        to: path.resolve(__dirname, 'src/assets')
      }
    ])
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
