const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  pages: {
    sampleapp: {
      entry: 'src/main.js',
      template: 'public/sampleapp.html',
      filename: 'sampleapp.html'
    }
  },
  lintOnSave: true,
  runtimeCompiler: true,
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin(
        [
          {
            context: 'public',
            to: 'index.html',
            from: 'index.html'
          },
          {
            context: 'node_modules/@kyma-project/luigi-core',
            to: './luigi-core',
            from: {
              glob: '**',
              dot: true
            }
          }
        ],
        {
          ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
          debug: 'warning'
        }
      )
    ]
  }
};
