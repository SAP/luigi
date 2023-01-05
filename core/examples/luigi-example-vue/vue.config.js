const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

  chainWebpack: config => {

    config.resolve.symlinks(false)
  },
  pages: {
    sampleapp: {
      entry: 'src/main.js',
      template: 'public/sampleapp.html',
      filename: 'sampleapp.html'
    }
  },
  lintOnSave: true,
  runtimeCompiler: true,
  outputDir: 'dist',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['css-loader']
        },
        {
          test: /\.scss$/,
          use: ['sass-loader']
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            context: 'public',
            to: 'index.html',
            from: 'index.html'
          },
          {
            from: 'node_modules/@luigi-project/core',
            to: './luigi-core',
          }
        ]
      }),
    ],
    optimization: {
      // todo: Remove after renaming luigi core map files
      minimizer: [
        new TerserPlugin({
          exclude: /\.svelte\.map\.js$/
        })
      ]
    },
  }
};
