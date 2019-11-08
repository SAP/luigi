
import { getParsedReadMeDoc } from './_parser';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

  getParsedReadMeDoc().then((contents) => {
    res.end(contents);
  });
}