
import { getParsedDocs } from './_parser';

export function get(req, res) {

  getParsedDocs().then((contents) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    const header = { 'Content-Type': 'application/json' };
    res.writeHead(200, header);

    res.end(contents);
  });
}

/** @type {import('./$types').PageLoad} */
export async function load() {
  // the `slug` parameter is available because
  // this file is called [slug].svelte
  const res = await fetch(`docs/${params.slug}`);
  const data = await res.json();

  if (res.status === 200) {
    return { post: data };
  } else {
    error(res.status, data.message);
  }
}