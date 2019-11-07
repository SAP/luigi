
import { getParsedDocs } from './_parser';

export function get(req, response) {
  res.setHeader("Strict-Transport-Security", "max-age=31536000");
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  });

  getParsedDocs().then((contents) => {
    response.end(contents);
  });
}