const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./src/main.js']
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  mode,
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './node_modules/@luigi-project/core', to: 'vendor/luigi-core' },
        { from: './node_modules/@luigi-project/client', to: 'vendor/luigi-client' },
        { from: './node_modules/@luigi-project/plugin-auth-oauth2', to: 'vendor/plugin-auth-oauth2' },
        { from: './node_modules/@luigi-project/plugin-auth-oidc', to: 'vendor/plugin-auth-oidc' },
        { from: './node_modules/fundamental-styles', to: 'vendor/fundamental-styles' },
        { from: './node_modules/@sap-theming/theming-base-content', to: 'vendor/theming-base-content' },
        ...['ace.js', 'mode-javascript.js', 'worker-javascript.js'].map(f => ({
          from: './node_modules/ace-builds/src-min/' + f,
          to: 'vendor/ace/src-min/'
        }))
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // TODO: Remove when renaming luigi.svete.map.js to .map filetype
        exclude: /\.svelte\.map\.js$/
      })
    ]
  },
  devtool: prod ? false : 'source-map',
  stats: {
    errorDetails: true
  }
};
