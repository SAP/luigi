
import { getParsedDocs } from './_parser';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

  getParsedDocs().then((contents) => {
    res.end(contents);
  });
}