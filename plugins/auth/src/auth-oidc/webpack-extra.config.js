const path = require('node:path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pluginRoot = path.join(__dirname, '../../../');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: pluginRoot + 'node_modules/oidc-client/dist/oidc-client.min.js',
          to: pluginRoot + 'auth/public/auth-oidc'
        }
      ]
    })
  ]
};
