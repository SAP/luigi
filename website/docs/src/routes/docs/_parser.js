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
// let parsedReadMeDoc;
// export function getParsedReadMeDoc() {
//   if (parsedReadMeDoc) {
//     return Promise.resolve(JSON.stringify(parsedReadMeDoc));
//   }
//   return setParsedReadMeDoc().then((doc) => {
//     parsedReadMeDoc = doc;
//     return Promise.resolve(JSON.stringify(parsedReadMeDoc));
//   });
// }

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
          viewUrl: `__BASE_URL__/docs/${name}`
        }));
      writeFileSync('./static/luigi/navigation-children-raw.json', JSON.stringify(navChildren, null, 2));

      // return for sapper
      return Promise.resolve(files);
    });
}

// function setParsedReadMeDoc() {
//   const dir = './../../docs';
//   let parsingArr;
//   readdirSync(dir)
//     .find(name => {
//       if(name == 'README.md') {
//         const mdContent = readFileSync(dir + '/' + name);
//         parsingArr = new Promise((resolve) => {
//           MarkdownSvc.process(mdContent).then((contents) => {
//             resolve({
//               contents
//             });
//           })
//         });
//       }
//     });
    
//   return parsingArr
//     .then((file) => {
//       // return for sapper
//       return file;
//     });
// }