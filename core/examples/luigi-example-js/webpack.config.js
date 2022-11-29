const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/@luigi-project/core', to: './luigi-core' },
        { from: 'node_modules/@luigi-project/client', to: './luigi-client' },
        {
          from: './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css',
          to: './fundamental-styles'
        },
        {
          from: 'node_modules/fundamental-styles/dist/fundamental-styles.css',
          to: './fundamental-styles'
        },
        {
          from: 'node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts',
          to: './fonts'
        }
      ]
    })
  ],
  // TODO: Remove optimization section altogether after https://github.com/SAP/luigi/issues/2965 resolved 
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\.svelte\.map\.js$/
      })
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
