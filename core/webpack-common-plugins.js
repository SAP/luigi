const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  copyWebpackPlugin: new CopyWebpackPlugin([
    {
      from: 'node_modules/oidc-client/dist/oidc-client.min.js',
      to: 'auth/oidc/'
    }
  ])
};
