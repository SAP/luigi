const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: 'node_modules/@kyma-project/luigi-core', to: './luigi-core' },
      { from: 'node_modules/@kyma-project/luigi-client', to: './luigi-client' },
      {
        from: 'node_modules/fiori-fundamentals/dist',
        to: './fiori-fundamentals'
      }
    ])
  ]
};
