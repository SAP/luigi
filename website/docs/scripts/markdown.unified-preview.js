import { MarkdownSvc } from '../src/services/markdown.service';
import { readdirSync, readFileSync } from 'fs';

const filesToProcess = [
  // 'plain.md',
  // 'codeblocks.md',
  'links.md',
  // 'link.md',
];

filesToProcess.forEach(async (name) => {
  const fileContent = readFileSync(__dirname + '/mocks/' + name);
  MarkdownSvc.process(String(fileContent), { shortName: name.replace('.md', '') }).then(result => {
    console.log(`============== ${name} =================`);
    console.log(result)
    console.log(`============ end: ${name} ==============`);
    console.log('');
  }).catch(e => console.error);
});