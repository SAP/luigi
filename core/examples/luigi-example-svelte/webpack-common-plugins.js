const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  copyWebpackPlugin: new CopyWebpackPlugin({
    patterns: [
      {
        from: 'src/favicon.ico',
        to: '.'
      },
      {
        from: 'src/logo.png',
        to: '.'
      },
      {
        from: 'src/luigi-config.js',
        to: '.'
      },
      {
        from: 'src/index.html',
        to: '.'
      },
      {
        from: 'src/mf.html',
        to: '.'
      },
      {
        from: 'node_modules/@luigi-project/core',
        to: 'luigi-core'
      },
      {
        from: 'node_modules/@luigi-project/client',
        to: 'luigi-client'
      }
    ]
  })
};
