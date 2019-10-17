import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import doc from 'rehype-document';
import format from 'rehype-format';
import html from 'rehype-stringify';
// import highlight from 'rehype-highlight'
import section from '@agentofuser/rehype-section';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

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
    .filter(name => name !== 'README.md')
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const mdContent = readFileSync(dir + '/' + name);

      parsingArr.push(new Promise((resolve) => {
        unified()
          .use(markdown)
          .use(remark2rehype, {allowDangerousHTML: true})
          .use(raw)
          .use(doc)
          .use(format)
          // .use(highlight)
          .use(section)
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
  
  return Promise.all(parsingArr)
    .then((files) => {
      // write Luigi navigation tree for our config
      const navChildren = files
        .map((fileObj) => (fileObj.shortName))
        .map((name) => ({
          label: name,
          pathSegment: name,
          navigationContext: 'doc',
          keepSelectedForChildren: true,
          viewUrl: `__BASE_URL__/docs/${name}`,
          context: {
            doc: name
          }
        }));
      writeFileSync('./static/luigi/navigation-children.json', JSON.stringify(navChildren, null, 2));

      // return for sapper
      return Promise.resolve(files);
    });
}