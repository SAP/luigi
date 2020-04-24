const CopyWebpackPlugin = require('copy-webpack-plugin');

const pluginRoot = __dirname + '/../../../';
module.exports = {
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: pluginRoot + 'node_modules/oidc-client/dist/oidc-client.min.js',
          to: pluginRoot + 'auth/public/auth-oidc'
        }
      ],
      {
        verbose: true
      }
    )
  ]
};
