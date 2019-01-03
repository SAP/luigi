const path = require('path');
module.exports = {
  watch: true,
  mode: 'production',
  entry: { generatedLuigiConfig: './src/assets/luigi-config/main.js' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/assets')
  }
};
