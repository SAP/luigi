const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const pluginRoot = path.join(__dirname, '/../../../');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: pluginRoot + 'node_modules/oidc-client-ts/dist/browser/oidc-client-ts.min.js',
          to: pluginRoot + 'auth/public/auth-oidc-pkce'
        }
      ]
    })
  ]
};
