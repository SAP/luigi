
import { getParsedDocs } from './_parser';

export function get(req, response) {
  response.setHeader("Strict-Transport-Security", "max-age=31536000");
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Strict-Transport-Security': 'max-age=31536000'
  });

  getParsedDocs().then((contents) => {
    // console.log('response', response.getHeader('Strict-Transport-Security'));
    response.end(contents);
  });
}