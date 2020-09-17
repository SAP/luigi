const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  mode: 'production',
  entry: {
    luigiConfig: './src/luigi-config/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new webpack.BannerPlugin(
      `
      Don't be afraid!
      This file was generated automatically and you should not modify it.
      The sources can be found in src/luigi-config/*
      `
    ),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/material-components-web/dist',
          to: path.resolve(__dirname, 'public', 'material-components-web')
        },
        // {
        //     from: 'node_modules/@luigi-project/core',
        //     to: path.resolve(__dirname, 'public', 'luigi-core'),
        // },
        {
          from: 'node_modules/@luigi-project/client',
          to: path.resolve(__dirname, 'public', 'luigi-client')
        }
        //   // idpProvider OAuth2 callback asset
        //   {
        //     from: 'node_modules/@luigi-project/plugin-auth-oauth2/callback.html',
        //     to: path.resolve(__dirname, 'src/assets') + '/auth-oauth2/'
        //   },
        //   // idpProvider OIDC assets
        //   {
        //     from: 'node_modules/@luigi-project/plugin-auth-oidc',
        //     to: path.resolve(__dirname, 'src/assets') + '/auth-oidc/'
        //   }
      ]
    })
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
