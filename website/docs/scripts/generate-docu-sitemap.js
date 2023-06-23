import { getParsedDocs } from './../src/markdown-conversion/plugins/parser.js';

import * as fs from 'fs';

getParsedDocs().then(raw => {
  const docs = raw;
  var header =
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  var footer = '</urlset>';
  var sitemapString = '';

  sitemapString = header;
  for (var i = 0; i < docs.length; i++) {
    sitemapString =
      sitemapString +
      '\xa0\xa0<url>\n' +
      '\xa0\xa0\xa0\xa0<loc>https://docs.luigi-project.io/docs/' +
      docs[i].shortName +
      '</loc>\n' +
      '\xa0\xa0\xa0\xa0<changefreq>monthly</changefreq>\n\xa0\xa0\xa0\xa0<priority>1.0</priority>\n' +
      '\xa0\xa0</url>\n';
  }
  sitemapString = sitemapString + footer;

  fs.writeFile('public/sitemap.xml', sitemapString, function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
});
