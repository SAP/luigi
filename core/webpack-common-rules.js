const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('node-sass');

module.exports = {
  svelte: {
    test: /\.svelte$/,
    // exclude: /node_modules/,
    use: {
      loader: 'svelte-loader',
      options: {
        emitCss: true,
        name: 'Luigi',
        preprocess: {
          style: ({ content, attributes }) => {
            if (attributes.type !== 'text/scss') return;
            return new Promise((fulfil, reject) => {
              sass.render(
                {
                  data: content,
                  includePaths: ['src'],
                  sourceMap: true,
                  outFile: 'x' // this is necessary, but is ignored
                },
                (err, result) => {
                  if (err) return reject(err);

                  fulfil({
                    code: result.css.toString(),
                    map: result.map.toString()
                  });
                }
              );
            });
          }
        }
      }
    }
  },
  css: {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader'
      }
    ]
  },
  urls: {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 50000
    }
  }
};
