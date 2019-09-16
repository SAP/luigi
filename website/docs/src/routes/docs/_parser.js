// implementation 1, remark with combined, non-flexible remark-html
// import * as remark from 'remark';
// import * as guide from 'remark-preset-lint-markdown-style-guide';
// import * as html from 'remark-html';

// implementation 2, unified plugin for more flexibility
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import doc from 'rehype-document';
import format from 'rehype-format';
import html from 'rehype-stringify';
// import highlight from 'rehype-highlight'
import section from '@agentofuser/rehype-section';

import { readdirSync, readFileSync } from 'fs';

let parsedDocs;
export function getParsedDocs() {
  if (parsedDocs) {
    return Promise.resolve(JSON.stringify(parsedDocs));
  }
  return setParsedDocs().then((docs) => {
    parsedDocs = docs;
    return Promise.resolve(JSON.stringify(parsedDocs));
  });
}

function setParsedDocs() {
  const dir = './src/docs';
  const parsingArr = [];
  readdirSync(dir)
    .filter(name => name.endsWith('.md'))
    .filter(name => name.indexOf('api') !== -1)
    .map(name => {
      const mdContent = readFileSync(dir + '/' + name);

      parsingArr.push(new Promise((resolve) => {
        // implementation 1 
        // remark()
        //   .use(guide)
        //   .use(html)

        // implementation 2
        unified()
          .use(markdown)
          .use(remark2rehype)
          .use(doc)
          .use(format)
          // .use(highlight)
          .use(section)
          // .use(customExamplesPlugin)
          .use(html)
          .process(String(mdContent), function (err, file) {
            // console.error(report(err || file))
            resolve({
              name,
              shortName: name.replace('.md', ''),
              // file,
              contents: file.contents
            });
          })
        })
      )
    });
  
  return Promise.all(parsingArr);
}