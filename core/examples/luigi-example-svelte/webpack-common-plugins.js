const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  copyWebpackPlugin: new CopyWebpackPlugin([
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
      from: 'node_modules/@kyma-project/luigi-core',
      to: 'luigi-core'
    },
    {
      from: 'node_modules/@kyma-project/luigi-client',
      to: 'luigi-client'
    },
    {
      from: 'node_modules/fiori-fundamentals/dist',
      to: 'fundamental-ui'
    }
  ])
};
