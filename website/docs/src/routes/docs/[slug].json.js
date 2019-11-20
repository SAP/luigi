import { getParsedDocs } from './_parser';

const lookup = new Map();
getParsedDocs().then(raw => {
	const docs = JSON.parse(raw);
	docs.forEach(doc => {
		console.log('lookup', doc.shortName);
		lookup.set(doc.shortName, JSON.stringify(doc));
	});
})

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
