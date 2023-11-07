const path = require('node:path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pluginRoot = path.join(__dirname, '../../../');
const repoRoot = path.join(pluginRoot, '../');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(repoRoot, 'node_modules/oidc-client/dist/oidc-client.min.js'),
          to: path.join(pluginRoot, 'auth/public/auth-oidc')
        }
      ]
    })
  ]
};
