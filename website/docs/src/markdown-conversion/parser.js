import { MarkdownSvc } from '../../services/markdown.service.js';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

let parsedDocs;
export function getParsedDocs() {
  if (parsedDocs) {
    return Promise.resolve(JSON.stringify(parsedDocs));
  }
  return setParsedDocs().then(docs => {
    parsedDocs = docs;
    return Promise.resolve(parsedDocs);
  });
}

function setParsedDocs() {
  const dirs = [
    './../../../../docs',
    './../../../../plugins/auth/public/auth-oauth2',
    './../../../../plugins/auth/public/auth-oidc',
    './../../../../plugins/auth/public/auth-oidc-pkce'
  ];
  const parsingArr = [];
  dirs.forEach(dir => {
    readdirSync(dir)
      .filter(name => name.endsWith('.md'))
      .forEach(name => {
        const mdContent = readFileSync(dir + '/' + name);
        parsingArr.push(
          new Promise(resolve => {
            let shortName = name.replace('.md', '');
            shortName = shortName == 'README' ? path.basename(dir) : shortName;
            MarkdownSvc.process(mdContent, { shortName }).then(contents => {
              resolve({
                name,
                shortName,
                // file,
                contents
              });
            });
          })
        );
      });
  });
  return Promise.all(parsingArr);
}
