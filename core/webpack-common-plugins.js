const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  copyWebpackPlugin: new CopyWebpackPlugin([
    {
      from: 'node_modules/oidc-client/dist/oidc-client.min.js',
      to: 'auth/oidc/'
    },
    {
      from: 'src/auth/oauth2/callback.html',
      to: 'auth/oauth2/callback.html'
    },
    {
      from: 'src/auth/oidc/silent-callback.html',
      to: 'auth/oidc/silent-callback.html'
    }
  ])
};
