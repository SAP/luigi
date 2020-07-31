const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const commonRules = require('./webpack-common-rules');
const execSync = require('child_process').execSync;
const fundamentalStyles = require('./fundamentalStyleClasses');

const luigifiles = [...fundamentalStyles, './src/main.js'];

module.exports = {
  entry: {
    luigi: luigifiles
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte', ',html'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    sourceMapFilename: '[name].svelte.map.js'
  },
  module: {
    rules: [commonRules.svelte, commonRules.css, commonRules.urls]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      exclude: ['package.json', 'README.md'],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    process.env.ANALYZE == 'true' &&
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
        generateStatsFile: true
      })
  ].filter(f => !!f), // filter out disabled plugins (eg ANALYZE returns undefined if not active)
  stats: {
    warnings: false
  },
  devtool: 'inline'
};
