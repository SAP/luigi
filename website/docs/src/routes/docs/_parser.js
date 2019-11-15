import { MarkdownSvc } from '../../services/markdown.service';
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
  const dir = './../../docs';
  const parsingArr = [];
  readdirSync(dir)
    // .filter(name => name !== 'README.md')
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const mdContent = readFileSync(dir + '/' + name);
      parsingArr.push(new Promise((resolve) => {
        const shortName = name.replace('.md', '');
        MarkdownSvc.process(mdContent, { shortName }).then((contents) => {
          resolve({
            name,
            shortName,
            // file,
            contents
          });
        })
      }));
    });
  
  return Promise.all(parsingArr);
}
