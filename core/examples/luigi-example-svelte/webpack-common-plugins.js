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
      from: 'src/styles.css',
      to: '.'
    },
    {
      from: 'node_modules/@luigi-project/core',
      to: 'luigi-core'
    },
    {
      from: 'node_modules/@luigi-project/client',
      to: 'luigi-client'
    },
    {
      from: 'node_modules/fundamental-styles/dist',
      to: 'fundamental-ui'
    },
    {
      from: 'node_modules/@sap-theming/theming-base-content',
      to: 'theming-base-content'
    }
  ])
};
