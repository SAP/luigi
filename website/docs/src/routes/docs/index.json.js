
import { getParsedDocs } from './_parser';

export function get(req, res) {
  const header = {
    "Strict-Transport-Security": "max-age=31536000;max-age=31536000; includeSubDomains; preload",
    'Content-Type': 'application/json'
  }
  //res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.writeHead(200, header);

  getParsedDocs().then((contents) => {
    //res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    //console.log('res ', res.getHeader('Strict-Transport-Security'));
    res.end(contents);
  });
}