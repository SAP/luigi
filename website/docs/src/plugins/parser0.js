import { MarkdownSvc } from '../services/markdown.service.js';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
var parsedDocs;
export function getParsedDocs() {
  if (parsedDocs) {
    return Promise.resolve(JSON.stringify(parsedDocs));
  }
  return setParsedDocs().then(function(docs) {
    parsedDocs = docs;
    // console.log(parsedDocs)
    return Promise.resolve(parsedDocs);
  });
}
function setParsedDocs() {
  var dirs = ['./../../docs', './../../plugins/auth/public/auth-oauth2', './../../plugins/auth/public/auth-oidc'];
  // const dirs = ['docs',
  //   'plugins/auth/public/auth-oauth2',
  //   'plugins/auth/public/auth-oidc'];
  var parsingArr = [];
  dirs.forEach(function(dir) {
    readdirSync(dir)
      // .filter(name => name !== 'README.md')
      .filter(function(name) {
        return name.endsWith('.md');
      })
      .forEach(function(name) {
        var mdContent = readFileSync(dir + '/' + name);
        parsingArr.push(
          new Promise(function(resolve) {
            var shortName = name.replace('.md', '');
            shortName = shortName == 'README' ? path.basename(dir) : shortName;
            MarkdownSvc.process(mdContent, { shortName: shortName }).then(function(contents) {
              resolve({
                name: name,
                shortName: shortName,
                // file,
                contents: contents
              });
            });
          })
        );
      });
  });
  return Promise.all(parsingArr);
}
//# sourceMappingURL=parser.js.map
