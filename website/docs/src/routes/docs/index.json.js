
import { getParsedDocs } from './_parser';

export function get(req, res) {
  const header = {
    "Strict-Transport-Security": "max-age=31536000;max-age=31536000; includeSubDomains; preload",
    'Content-Type': 'application/json'
  }
  //res.writeHead(200, header);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  getParsedDocs().then((contents) => {
    console.log('res ', res.getHeader('Strict-Transport-Security'));
    res.end(contents);
  });
}