const sass = require('node-sass');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  svelte: {
    test: /\.(html|svelte)$/,
    use: {
      loader: 'svelte-loader',
      options: {
        emitCss: true,
        hotReload: true,
        preprocess: {
          style: ({ content, attributes }) => {
            if (attributes.type !== 'text/scss') return;
            return new Promise((fulfil, reject) => {
              sass.render(
                {
                  data: content,
                  includePaths: ['src'],
                  sourceMap: true,
                  outFile: 'x'
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
    use: ['style-loader', 'css-loader']
  },
  urls: {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 50000
    }
  }
};
