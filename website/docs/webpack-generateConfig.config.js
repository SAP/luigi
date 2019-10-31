const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('node-sass');
const commonRules = require('./webpack-common-rules');

module.exports = {
  watch: false,
  mode: 'production',
  entry: {
    extendedConfiguration: './src/luigi-config/extended/main.js',
    coreStyles: './src/luigi-config/styles/index.scss',
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
        "from": "../../docs/assets",
        "to": "../assets"
      }
    ]),
    new webpack.BannerPlugin(
      `
      Don't be afraid!
      This file was generated automatically and you should not modify it.
      The documentation (located in /docs) will tell you how to modify Luigi configuration with pleasure.
      `
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
    ]
  }
};
