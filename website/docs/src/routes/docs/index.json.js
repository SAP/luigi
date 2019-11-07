
import { getParsedDocs } from './_parser';

export function get(req, response) {
  response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  });

  getParsedDocs().then((contents) => {
    response.end(contents);
  });
}