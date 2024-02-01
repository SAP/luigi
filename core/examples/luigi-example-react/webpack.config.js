const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');
module.exports = function(webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';
  return {
    entry: './src/index.js',
    output: {
      publicPath: '/',
      path: isEnvProduction ? path.join(__dirname, '/build') : undefined,
      pathinfo: !isEnvProduction,
      filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.[name].js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
      globalObject: 'this'
    },
    plugins: [
      // copy luigi core resources to runtime directory
      new CopyWebpackPlugin({
        patterns: [
          {
            context: 'public',
            to: 'index.html',
            from: 'index.html'
          },
          {
            context: 'public',
            to: 'luigi-config.js',
            from: 'luigi-config.js'
          },
          {
            from: 'node_modules/@luigi-project/core',
            to: './luigi-core'
          }
        ]
      }),
      // copy and inject the resulting webpack bundle to sampleapp.html instead of index.html
      new HTMLWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: './public/sampleapp.html',
            filename: 'sampleapp.html'
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      )
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ]
            }
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000,
      open: true
    },
    devtool: !isEnvProduction ? 'inline-source-map' : false,
    // Change accordingly on prodcuciton
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };
};
