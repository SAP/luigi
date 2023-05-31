import { writeFileSync } from 'fs';
import path from 'path';
import { getParsedDocs } from './parser.js';

getParsedDocs().then(function(a) {
  var __dirname = path.resolve();
  var dataFolder = __dirname + '/../data';
  var docsFilePath = dataFolder + '/docs.json';
  console.log('conerting markdown... ', JSON.stringify(a));
  writeFileSync(docsFilePath, JSON.stringify(a));
});
console.log('...------>');
