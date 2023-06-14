import { writeFileSync } from 'fs';
import path from 'path';
import { getParsedDocs } from './parser.js';

getParsedDocs().then(function(a) {
  var __dirname = path.resolve();
  var dataFolder = __dirname + '/src/data';
  var docsFilePath = dataFolder + '/docs.json';
  writeFileSync(docsFilePath, JSON.stringify(a));
});
console.log('Generating docs file to save to');
