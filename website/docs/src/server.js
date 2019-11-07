import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import hsts from 'hsts';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
let basePath;
if (PORT == '4001') {
	basePath = '/';
} else {
	basePath = '/docu-microfrontend';
}
polka()
	.use(
		basePath,
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		hsts({
			maxAge: 31536000
		}),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
