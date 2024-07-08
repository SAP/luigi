const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false);
  },
  pages: {
    sampleapp: {
      entry: 'src/main.js',
      template: 'public/sampleapp.html',
      filename: 'sampleapp.html'
    }
  },
  runtimeCompiler: true,
  outputDir: 'dist',
  configureWebpack: {
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
            to: './luigi-core'
          }
        ]
      })
    ]
  }
};
