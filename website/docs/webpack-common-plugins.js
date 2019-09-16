const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  copyWebpackPlugin: new CopyWebpackPlugin([
    {
      "from": "node_modules/@kyma-project/luigi-client",
      "to": "luigi-client"
    },
    {
      "from": "node_modules/fiori-fundamentals/dist",
      "to": "fundamental-ui"
    }
  ])
};
