const { readFileSync } = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const babelSettings = JSON.parse(readFileSync('.babelrc'));
const commonPlugins = require('./webpack-common-plugins');
const commonRules = require('./webpack-common-rules');

module.exports = {
  entry: {
    'luigi-ie11': [
      './node_modules/fiori-fundamentals/dist/fiori-fundamentals-ie11.min.css',
      './src/main.js'
    ]
  },
  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.js', '.html']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: babelSettings
        }
      },
      {
        test: /\.(js)$/,
        include: /node_modules\/svelte/,
        use: {
          loader: 'babel-loader',
          query: babelSettings
        }
      },
      commonRules.svelte,
      commonRules.css,
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'postcss-loader'
          }
        ]
      },
      commonRules.urls
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      exclude: ['package.json', 'README.md', 'luigi.css', 'luigi.js'],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    commonPlugins.copyWebpackPlugin
  ],
  mode: 'production',
  stats: {
    warnings: false
  }
};
