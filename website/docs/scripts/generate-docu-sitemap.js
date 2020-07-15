import { getParsedDocs } from '../src/routes/docs/_parser';
var fs = require('fs')

getParsedDocs().then(raw => {
  const docs = JSON.parse(raw);
  var header = '<?xml version="1.0" encoding="utf-8"?>'
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
  var footer = '</urlset>';
  var sitemapString = "";

  sitemapString = header;
  for(var i=0; i<docs.length; i++) {
    sitemapString = sitemapString + '<url>\n'
    + '<loc>https://docs.luigi-project.io/docs/' + docs[i].shortName + '/</loc>\n'
    + '<changefreq>monthly</changefreq>\n<priority>1.0</priority>\n'
    + '</url>\n'

    //console.log("TEST", docs[i].shortName);
  }
  sitemapString = sitemapString + footer;

  fs.writeFile('sitemap123.xml', sitemapString,  function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
});