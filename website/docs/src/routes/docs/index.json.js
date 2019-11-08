
import { getParsedDocs } from './_parser';

export function get(req, res) {

  getParsedDocs().then((contents) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    const header = {
      "Strict-Transport-Security": "max-age=31536000;max-age=31536000; includeSubDomains; preload",
      'Content-Type': 'application/json'
    }
    res.writeHead(200, header);

    res.end(contents);
  });
}