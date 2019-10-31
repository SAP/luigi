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
    .filter(name => name !== 'README.md')
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const mdContent = readFileSync(dir + '/' + name);
      parsingArr.push(new Promise((resolve) => {
        MarkdownSvc.process(mdContent).then((contents) => {
          resolve({
            name,
            shortName: name.replace('.md', ''),
            // file,
            contents
          });
        })
      }));
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