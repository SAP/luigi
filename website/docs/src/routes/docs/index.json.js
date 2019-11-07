
import { getParsedDocs } from './_parser';

export function get(req, response) {
  req.setHeader("Strict-Transport-Security", "max-age=31536000");
  response.setHeader("Strict-Transport-Security", "max-age=31536000");
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Strict-Transport-Security': 'max-age=31536000'
  });

  getParsedDocs().then((contents) => {
    response.end(contents);
  });
}