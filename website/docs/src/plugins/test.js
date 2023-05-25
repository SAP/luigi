import { writeFileSync } from 'fs';
import path from 'path';
import { getParsedDocs } from './parser.js';

getParsedDocs().then(function(a) {
  console.log('++++++>');
  var __dirname = path.resolve();
  console.log(__dirname);
  var dataFolder = __dirname + '/../data';
  console.log(dataFolder);
  var docsFilePath = dataFolder + '/docs.json';
  console.log(docsFilePath);
  console.log(1111, JSON.stringify(a));
  writeFileSync(docsFilePath, JSON.stringify(a));
  //
});
console.log('------>');
//# sourceMappingURL=test.js.map
